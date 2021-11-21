import request from 'supertest';
import { app } from '../../app';

it( 'clears the cookie after signing out', async () => {
  const firstName = "fName";
  const lastName = "lName";
  const email = 'test@test.com';
  const password = 'password';

  const signupResponse = await request( app )
    .post( '/api/users/signup' )
    .send( {
      firstName, lastName, email, password
    } )
    .expect( 201 );

  const cookie = signupResponse.get( 'Set-Cookie' );
  const signoutResponse = await request( app )
    .post( '/api/users/signout' )
    .set( 'Cookie', cookie )
    .send( {} )
    .expect( 200 );

  expect( signoutResponse.get( 'Set-Cookie' )[ 0 ] ).toEqual(
    'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
} );