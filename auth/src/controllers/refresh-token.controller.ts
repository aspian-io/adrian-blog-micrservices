import { NextFunction, Request, Response } from 'express';
import refreshTokenService from '../services/refreshToken';
import setTokenCookie from '../helpers/cookie';
import { NotAuthenticatedError } from '@aspianet/common';

async function refreshTokenController ( req: Request, res: Response, next: NextFunction ) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  if ( token ) {
    try {
      const { refreshToken, ...user } = await refreshTokenService( { token, ipAddress } );
      setTokenCookie( res, refreshToken );
      res.status( 200 ).send( user );
    } catch ( error ) { next( error ) }
  }
  throw new NotAuthenticatedError();
};

export default refreshTokenController;