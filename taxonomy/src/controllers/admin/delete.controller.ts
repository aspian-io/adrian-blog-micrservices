import { NotFoundError } from "@aspianet/common";
import { NextFunction, Request, Response } from "express";
import { Taxonomy } from "../../models/taxonomy";

async function deleteController ( req: Request, res: Response, next: NextFunction ) {
  const taxonomy = await Taxonomy.findById( req.params.id );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  await taxonomy.delete();

  res.send( {} );
}

export default deleteController;