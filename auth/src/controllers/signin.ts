import setTokenCookie from '../helpers/cookie';
import { NextFunction, Request, Response } from 'express';
import authenticate from '../services/authenticate';

async function signin ( req: Request, res: Response, next: NextFunction ) {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  try { 
    const { refreshToken, ...user } = await authenticate( { email, password, ipAddress } );
    setTokenCookie( res, refreshToken );
    res.status( 200 ).send( user );
  } catch ( err ) { next( err ) }
};

export default signin;