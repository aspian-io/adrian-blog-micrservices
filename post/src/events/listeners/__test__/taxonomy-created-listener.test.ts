import { TaxonomyCreatedEvent, TaxonomyTypeEnum } from "@aspianet/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TaxonomyCreatedListener } from "../taxonomy-created-listener";
import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { Taxonomy } from "../../../models/taxonomy";

const setup = async () => {
  // Create an instance of the listener
  const listener = new TaxonomyCreatedListener( natsWrapper.client );
  // Create a fake data event
  const data: TaxonomyCreatedEvent[ 'data' ] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    type: TaxonomyTypeEnum.CATEGORY,
    description: "",
    term: "category 1 for test",
    slug: "category-1-for-test",
    version: 0
  };
  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
};

it( "creates and saves a taxonomy", async () => {
  const { listener, data, msg } = await setup();
  // Call the onMessage function with the data object + message object
  await listener.onMessage( data, msg );
  // Write assertion to make sure a taxonomy was created!
  const taxonomy = await Taxonomy.findById( data.id );

  expect( taxonomy ).toBeDefined();
  expect( taxonomy!.type ).toEqual( data.type );
  expect( taxonomy!.term ).toEqual( data.term );
  expect( taxonomy!.slug ).toEqual( data.slug );
} );

it( "acks the message", async () => {
  const { listener, data, msg } = await setup();
  // Call the onMessage function with the data object + message object
  await listener.onMessage( data, msg );
  // Write assertion to make sure ack function is called
  expect( msg.ack ).toHaveBeenCalled();
} );