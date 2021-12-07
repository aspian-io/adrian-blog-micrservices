import { NotFoundError } from "@aspianet/common";
import { NextFunction, Request, Response } from "express";
import { TaxonomyUpdatedPublisher } from "../../events/publishers/taxonomy-updated-publisher";
import { Taxonomy } from "../../models/taxonomy";
import { natsWrapper } from "../../nats-wrapper";

async function editController ( req: Request, res: Response, next: NextFunction ) {
  const taxonomy = await Taxonomy.findById( req.params.id );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  taxonomy.set( {
    type: req.body.type,
    description: req.body.description,
    term: req.body.term,
    slug: req.body.slug,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip
  } );
  await taxonomy.save();
  await new TaxonomyUpdatedPublisher( natsWrapper.natsConnection ).publish( {
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