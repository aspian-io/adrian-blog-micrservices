import { Request, Response } from 'express';

async function getCurrentUser ( req: Request, res: Response ) {
  res.send( { currentUser: req.currentUser || null } );
};

export default getCurrentUser;