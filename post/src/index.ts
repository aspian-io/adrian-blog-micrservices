import mongoose from 'mongoose';
import { app } from './app';
import { TaxonomyCreatedListener } from './events/listeners/taxonomy-created-listener';
import { TaxonomyDeletedListener } from './events/listeners/taxonomy-deleted-listener';
import { TaxonomyUpdatedListener } from './events/listeners/taxonomy-updated-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if ( !process.env.JWT_KEY ) {
    throw new Error( 'JWT_KEY must be defined' );
  }
  if ( !process.env.MONGO_URI ) {
    throw new Error( 'MONGO_URI must be defined' );
  }
  if ( !process.env.NATS_CLUSTER_NAME ) {
    throw new Error( 'NATS_CLUSTER_NAME must be defined' );
  }
  if ( !process.env.NATS_URLS ) {
    throw new Error( 'NATS_URLS must be defined' );
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_NAME,
      process.env.NATS_URLS
    );
    if ( natsWrapper.client.isClosed() ) {
      console.log( 'NATS connection closed!' );
      process.exit();
    }
    process.on( 'SIGINT', async () => await natsWrapper.client.drain() );
    process.on( 'SIGTERM', async () => await natsWrapper.client.drain() );

    await mongoose.connect( process.env.MONGO_URI );
    console.log( 'Connected to MongoDb' );

    // Listeners init
    await new TaxonomyCreatedListener( natsWrapper.client ).listen();
    await new TaxonomyUpdatedListener( natsWrapper.client ).listen();
    await new TaxonomyDeletedListener( natsWrapper.client ).listen();

  } catch ( err ) {
    console.error( err );
  }

  app.listen( 3000, () => {
    console.log( "Listening on port 3000!" );
  } );
};

start();