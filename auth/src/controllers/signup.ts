import { User } from '../models/user';
import { NextFunction, Request, Response } from 'express';
import authenticate from '../services/authenticate';
import setTokenCookie from '../helpers/cookie';
import { BadRequestError } from '@aspianet/common';

async function signup ( req: Request, res: Response, next: NextFunction ) {
  const { firstName, lastName, email, password } = req.body;
  const ipAddress = req.ip;
  const existingUser = await User.findOne( { email } );
  if ( existingUser ) {
    throw new BadRequestError( 'Email in use' );
  }
  const user = User.build( { firstName, lastName, email, password, createdByIp: ipAddress, lastIp: ipAddress } );
  await user.save();

  try {
    const { refreshToken, ...user } = await authenticate( { email, password, ipAddress } );
    setTokenCookie( res, refreshToken );
    res.status( 201 ).send( user );
  } catch ( error ) {
    next( error );
  }
};

export default signup;