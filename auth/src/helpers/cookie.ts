import { Response } from 'express';

const setTokenCookie = ( res: Response, token: string ) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ),
    secure: process.env.NODE_ENV !== 'test'
  };
  res.cookie( 'refreshToken', token, cookieOptions );
}

export default setTokenCookie;