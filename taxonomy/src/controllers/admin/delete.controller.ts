import { NotFoundError } from "@aspianet/common";
import { NextFunction, Request, Response } from "express";
import { TaxonomyDeletedPublisher } from "../../events/publishers/taxonomy-deleted-publisher";
import { Taxonomy } from "../../models/taxonomy";
import { natsWrapper } from "../../nats-wrapper";

async function deleteController ( req: Request, res: Response, next: NextFunction ) {
  const taxonomy = await Taxonomy.findById( req.params.id );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  await taxonomy.delete();
  await new TaxonomyDeletedPublisher( natsWrapper.client ).publish( { id: taxonomy.id } );

  res.send( {} );
}

export default deleteController;