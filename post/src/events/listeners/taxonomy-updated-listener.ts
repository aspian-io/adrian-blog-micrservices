import { Listener, Subjects, TaxonomyUpdatedEvent } from "@aspianet/common";
import { JsMsg } from "nats";
import { Taxonomy } from "../../models/taxonomy";
import { streamName } from "../stream-name";

export class TaxonomyUpdatedListener extends Listener<TaxonomyUpdatedEvent> {
  stream = streamName;
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;

  async onMessage ( data: TaxonomyUpdatedEvent[ 'data' ], msg: JsMsg ) {
    const { id, type, description, term, slug } = data;
    console.log( `Event Data #${ msg.seq } - `, data );
    const taxonomy = await Taxonomy.findByEvent( data );

    if ( !taxonomy ) {
      throw new Error( 'Ticket not found' );
    }

    taxonomy.set( { id, type, description, term, slug } );
    await taxonomy.save();

    msg.ack();
  }
}