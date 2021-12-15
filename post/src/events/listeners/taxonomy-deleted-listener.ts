import { BadRequestError, Listener, Streams, Subjects, TaxonomyDeletedEvent } from "@aspianet/common";
import { JsMsg } from "nats";
import { Taxonomy } from "../../models/taxonomy";
import { queueGroupName } from "../queue-group-name";

export class TaxonomyDeletedListener extends Listener<TaxonomyDeletedEvent> {
  stream: Streams.Taxonomy = Streams.Taxonomy;
  subject: Subjects.TaxonomyDeleted = Subjects.TaxonomyDeleted;
  queueGroupName: string = queueGroupName;

  async onMessage ( data: TaxonomyDeletedEvent[ 'data' ], msg: JsMsg ) {
    const taxonomy = await Taxonomy.findById( data.id );
    if ( !taxonomy ) {
      throw new BadRequestError( "Taxonomy not found in post service" );
    }
    await taxonomy.delete();

    msg.ack();
  }
}