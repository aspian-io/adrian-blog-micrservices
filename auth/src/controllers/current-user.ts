import { Request, Response } from 'express';

async function getCurrentUser ( req: Request, res: Response ) {
  console.log( 'current user: ', req.currentUser?.email )
  res.send( { currentUser: req.currentUser || null } );
};

export default getCurrentUser;