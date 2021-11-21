import { Request, Response } from 'express';
import { Taxonomy } from '../../models/taxonomy';

async function createController ( req: Request, res: Response ) {
  const { type, description, term, slug } = req.body;

  const taxonomy = Taxonomy.build( { type, description, term, slug, createdBy: req.currentUser!.id, createdByIp: req.ip } );
  await taxonomy.save();

  res.status( 201 ).send( taxonomy );
}

export default createController;