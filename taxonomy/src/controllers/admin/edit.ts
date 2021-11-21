import { NotFoundError } from "@aspianet/common";
import { NextFunction, Request, Response } from "express";
import { Taxonomy } from "../../models/taxonomy";

async function edit ( req: Request, res: Response, next: NextFunction ) {
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

  res.send( taxonomy );
}

export default edit;