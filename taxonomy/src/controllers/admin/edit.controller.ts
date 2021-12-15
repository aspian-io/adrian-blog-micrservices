import { BadRequestError, NotFoundError } from "@aspianet/common";
import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import { TaxonomyUpdatedPublisher } from "../../events/publishers/taxonomy-updated-publisher";
import { Taxonomy } from "../../models/taxonomy";
import { natsWrapper } from "../../nats-wrapper";

async function editController ( req: Request, res: Response, next: NextFunction ) {
  const { type, description, term } = req.body;
  const taxonomy = await Taxonomy.findById( req.params.id );
  const slug = slugify( term );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  if ( taxonomy.type === type && taxonomy.term === term && taxonomy.slug === slug ) {
    return res.status( 200 ).send( taxonomy );
  }

  const isDuplicated = await Taxonomy.findOne( { type, term } );
  if ( isDuplicated && isDuplicated.id !== req.params.id ) {
    throw new BadRequestError( "Duplicated taxonomy is not allowed" );
  }

  taxonomy.set( {
    type,
    description,
    term,
    slug,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip
  } );
  await taxonomy.save();

  await new TaxonomyUpdatedPublisher( natsWrapper.client ).publish( {
    id: taxonomy.id,
    type: taxonomy.type,
    description: taxonomy.description,
    term: taxonomy.term,
    slug: taxonomy.slug,
    version: taxonomy.version
  } );

  res.send( taxonomy );
}

export default editController;