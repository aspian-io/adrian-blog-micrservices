import { natsWrapper } from './nats-wrapper';

const start = async () => {
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

  } catch ( err ) {
    console.error( err );
  }
};

start();