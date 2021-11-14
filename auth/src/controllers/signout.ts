import revokeToken from '../services/revokeToken';
import { NextFunction, Request, Response } from 'express';

async function signout ( req: Request, res: Response, next: NextFunction ) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  try {
    await revokeToken( { token, ipAddress } )
  } catch ( error ) { next( error ) }
  res.clearCookie( 'refreshToken' );
  res.status( 200 ).send( {} );
};

export default signout;