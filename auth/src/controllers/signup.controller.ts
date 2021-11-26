import { User } from '../models/user';
import { NextFunction, Request, Response } from 'express';
import authenticate from '../services/authenticate';
import setTokenCookie from '../helpers/cookie';
import { BadRequestError, CorePolicies } from '@aspianet/common';
import { Claim } from '../models/claim';

async function signupController ( req: Request, res: Response, next: NextFunction ) {
  const { firstName, lastName, email, password } = req.body;
  const ipAddress = req.ip;
  const existingUser = await User.findOne( { email } );
  if ( existingUser ) {
    throw new BadRequestError( 'Email in use' );
  }

  const user = User.build( { firstName, lastName, email, password, createdByIp: ipAddress, lastIp: ipAddress } );
  await user.save();
  const claim = Claim.build( { user, claim: CorePolicies.CoreClaims__USER } );
  await claim.save();

  try {
    const { refreshToken, ...user } = await authenticate( { email, password, ipAddress } );
    setTokenCookie( res, refreshToken );
    res.status( 201 ).send( user );
  } catch ( error ) {
    next( error );
  }
};

export default signupController;