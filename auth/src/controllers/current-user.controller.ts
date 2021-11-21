import { Request, Response } from 'express';

async function currentUserController ( req: Request, res: Response ) {
  res.send( { currentUser: req.currentUser || null } );
};

export default currentUserController;