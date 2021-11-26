import { Listener, Subjects, TaxonomyUpdatedEvent } from "@aspianet/common";
import { Message } from 'node-nats-streaming';
import { Taxonomy } from "../../models/taxonomy";
import { queueGroupName } from "./queue-group-name";

export class TaxonomyUpdatedListener extends Listener<TaxonomyUpdatedEvent> {
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;
  queueGroupName = queueGroupName;

  async onMessage ( data: TaxonomyUpdatedEvent[ 'data' ], msg: Message ) {
    const { id, type, description, term, slug } = data;
    const taxonomy = await Taxonomy.findByEvent( data );

    if ( !taxonomy ) {
      throw new Error( 'Ticket not found' );
    }

    taxonomy.set( { id, type, description, term, slug } );
    await taxonomy.save();

    msg.ack();
  }
}