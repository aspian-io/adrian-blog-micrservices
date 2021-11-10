import { UserPayload } from 'custom-types/custom';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import getRefreshToken from '@services/getRefreshToken';
import generateJwtToken from '@services/generateJwtToken';
import getUserClaims from '@services/getUserClaims';

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ( !req.headers.authorization ) {
    if ( !req.cookies.refreshToken ) {
      return next();
    }
    const token: string = req.cookies.refreshToken;
    try {
      const refreshToken = await getRefreshToken( token );
      const claims = await getUserClaims( refreshToken.user.id );
      req.headers.authorization = generateJwtToken( refreshToken.user, claims );
    } catch ( error ) {
      res.clearCookie( "refreshToken" );
      return next()
    }
  }

  if ( req.headers.authorization ) {
    const payload = ( jwt.verify( req.headers.authorization, process.env.JWT_KEY! ) ) as UserPayload;
    req.currentUser = { id: payload.id, email: payload.email, role: payload.role, claims: payload.claims };
  }
  next();
};