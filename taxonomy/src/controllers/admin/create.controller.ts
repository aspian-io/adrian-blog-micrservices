import { Request, Response } from 'express';
import { TaxonomyCreatedPublisher } from '../../events/publishers/taxonomy-created-publisher';
import { Taxonomy } from '../../models/taxonomy';
import { natsWrapper } from '../../nats-wrapper';

async function createController ( req: Request, res: Response ) {
  const { type, description, term, slug } = req.body;

  const taxonomy = Taxonomy.build( { type, description, term, slug, createdBy: req.currentUser!.id, createdByIp: req.ip } );
  await taxonomy.save();
  await new TaxonomyCreatedPublisher( natsWrapper.client ).publish( {
    id: taxonomy.id,
    type: taxonomy.type,
    description: taxonomy.description,
    term: taxonomy.term,
    slug: taxonomy.slug,
    version: taxonomy.version
  } );

  res.status( 201 ).send( taxonomy );
}

export default createController;