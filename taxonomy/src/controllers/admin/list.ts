import { NextFunction, Request, Response } from "express";
import { Taxonomy } from "../../models/taxonomy";

async function list ( req: Request, res: Response, next: NextFunction ) {
  const taxonomies = await Taxonomy.find( {} );

  res.send( taxonomies );
}

export default list;