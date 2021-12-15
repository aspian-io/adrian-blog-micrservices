import { TaxonomyDeletedEvent, TaxonomyTypeEnum } from "@aspianet/common";
import mongoose from "mongoose";
import { JsMsg } from "nats";
import { Taxonomy } from "../../../models/taxonomy";
import { natsWrapper } from "../../../nats-wrapper"
import { TaxonomyDeletedListener } from "../taxonomy-deleted-listener"

const setup = async () => {
  // Create an instance of the listener
  const listener = new TaxonomyDeletedListener( natsWrapper.client );
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
  const data: TaxonomyDeletedEvent[ 'data' ] = {
    id: taxonomy.id
  };
  // Create a fake message object
  // @ts-ignore
  const msg: JsMsg = {
    ack: jest.fn()
  };

  return { listener, data, msg, taxonomy }
}

it( "finds and deletes a taxonomy", async () => {
  const { listener, data, msg, taxonomy } = await setup();
  await listener.onMessage( data, msg );
  const deletedTaxonomy = await Taxonomy.findById( taxonomy.id );

  expect( deletedTaxonomy ).toBeNull();
} );

it( "acks the message", async () => {
  const { listener, data, msg } = await setup();
  // Call the onMessage function with the data object + message object
  await listener.onMessage( data, msg );
  // Write asserting to make sure ack function is called
  expect( msg.ack ).toHaveBeenCalled();
} );