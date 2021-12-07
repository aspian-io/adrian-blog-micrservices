import { Listener, Subjects, TaxonomyCreatedEvent } from "@aspianet/common";
import { JsMsg } from "nats";
import { Taxonomy } from "../../models/taxonomy";
import { streamName } from "../stream-name";

export class TaxonomyCreatedListener extends Listener<TaxonomyCreatedEvent> {
  stream = streamName;
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;

  async onMessage ( data: TaxonomyCreatedEvent[ 'data' ], msg: JsMsg ) {
    const { id, type, description, term, slug } = data;
    console.log( `Event Data #${ msg.seq } - `, data );
    const taxonomy = Taxonomy.build( { id, type, description, term, slug } );
    await taxonomy.save();

    msg.ack();
  }
}