import { TaxonomyCreatedEvent, TaxonomyTypeEnum } from "@aspianet/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TaxonomyUpdatedListener } from "../taxonomy-updated-listener";
import mongoose from 'mongoose';
import { Taxonomy } from "../../../models/taxonomy";

const setup = async () => {
  // Create an instance of the listener
  const listener = new TaxonomyUpdatedListener( natsWrapper.client );
  // Create and save a taxonomy
  const taxonomy = Taxonomy.build( {
    id: new mongoose.Types.ObjectId().toHexString(),
    type: TaxonomyTypeEnum.CATEGORY,
    description: "",
    term: "category 1 for test",
    slug: "category-1-for-test"
  } );
  await taxonomy.save();
  // Create a fake data event
  const data: TaxonomyCreatedEvent[ 'data' ] = {
    id: taxonomy.id,
    type: TaxonomyTypeEnum.CATEGORY,
    description: "",
    term: "category 1 for test updated",
    slug: "category-1-for-test-updated",
    version: taxonomy.version + 1
  };
  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, taxonomy };
}

it( "finds, updates, and saves a taxonomy", async () => {
  const { listener, data, msg, taxonomy } = await setup();
  await listener.onMessage( data, msg );
  const updatedTaxonomy = await Taxonomy.findById( taxonomy.id );

  expect( updatedTaxonomy!.type ).toEqual( data.type );
  expect( updatedTaxonomy!.term ).toEqual( data.term );
  expect( updatedTaxonomy!.slug ).toEqual( data.slug );
} );

it( "acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage( data, msg );

  expect( msg.ack ).toHaveBeenCalled();
} );

it( "does not call ack if the event has a skipped version number", async () => {
  const { listener, data, msg } = await setup();
  data.version = 10;
  try {
    await listener.onMessage( data, msg );
  } catch ( err ) { }

  expect( msg.ack ).not.toHaveBeenCalled();
} );