import { Listener, Subjects, TaxonomyCreatedEvent } from "@aspianet/common";
import { Message } from 'node-nats-streaming';
import { Taxonomy } from "../../models/taxonomy";
import { queueGroupName } from "./queue-group-name";

export class TaxonomyCreatedListener extends Listener<TaxonomyCreatedEvent> {
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
  queueGroupName = queueGroupName;

  async onMessage ( data: TaxonomyCreatedEvent[ 'data' ], msg: Message ) {
    const { id, type, description, term, slug } = data;
    const taxonomy = Taxonomy.build( { id, type, description, term, slug } );
    await taxonomy.save();

    msg.ack();
  }
}