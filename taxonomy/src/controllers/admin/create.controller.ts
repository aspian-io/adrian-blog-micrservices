import { BadRequestError } from '@aspianet/common';
import { Request, Response } from 'express';
import { TaxonomyCreatedPublisher } from '../../events/publishers/taxonomy-created-publisher';
import { Taxonomy } from '../../models/taxonomy';
import { natsWrapper } from '../../nats-wrapper';
import slugify from 'slugify';

async function createController ( req: Request, res: Response ) {
  const { type, description, term } = req.body;
  const slug = slugify( term );

  const taxonomy = Taxonomy.build( { type, description, term, slug, createdBy: req.currentUser!.id, createdByIp: req.ip } );

  const isDuplicated = await Taxonomy.find( { type, term } );
  if ( isDuplicated.length ) {
    throw new BadRequestError( "Duplicated taxonomy is not allowed" );
  }

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