import { NotAuthorizedError } from '@errors/not-authorized-error';
import { RefreshToken } from '@models/refresh-token';
import { User } from '@models/user';
import { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';

export const authorize = ( policy: string ) => {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  // if ( typeof roles === 'string' ) {
  //   roles = [ roles ];
  // }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    //jwt( { secret: process.env.JWT_KEY!, algorithms: [ 'HS256' ] } ),

    // authorize based on user role
    async ( req: Request, res: Response, next: NextFunction ) => {
      //const user = await User.findById( req.currentUser?.id );

      if ( !req.currentUser || !req.currentUser.claims.includes( policy ) ) {
        throw new NotAuthorizedError();
      }

      // authentication and authorization successful
      //req.currentUser!.role = user.role;
      // const tokenList = await RefreshToken.find();
      // const refreshTokens = await RefreshToken.find( { user: req.currentUser.id } );
      // req.currentUser!.ownsToken = !!refreshTokens.find( x => x.token === req.cookies );
      next();
    }
  ];
}