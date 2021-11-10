import request from 'supertest';
import { app } from '../../app';

it( 'clears the cookie after signing out', async () => {
  const cookie = await signup();

  const response = await request( app )
    .post( '/api/users/signout' )
    .set( 'Cookie', cookie )
    .send( {} )
    .expect( 200 );

  expect( response.get( 'Set-Cookie' )[ 0 ] ).toEqual(
    'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
} );