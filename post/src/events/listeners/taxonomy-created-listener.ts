import { Listener, Streams, Subjects, TaxonomyCreatedEvent } from "@aspianet/common";
import { JsMsg } from "nats";
import { Taxonomy } from "../../models/taxonomy";
import { queueGroupName } from "../queue-group-name";

export class TaxonomyCreatedListener extends Listener<TaxonomyCreatedEvent> {
  stream: Streams.Taxonomy = Streams.Taxonomy;
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
  queueGroupName: string = queueGroupName;

  async onMessage ( data: TaxonomyCreatedEvent[ 'data' ], msg: JsMsg ) {
    const { id, type, description, term, slug } = data;
    const taxonomy = Taxonomy.build( { id, type, description, term, slug } );
    await taxonomy.save();

    msg.ack();
  }
}