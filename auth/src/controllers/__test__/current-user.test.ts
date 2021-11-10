import request from 'supertest';
import { app } from '../../app';

it( 'response with datails about the current user', async () => {
  const cookie = await signup();

  const response = await request( app )
    .get( '/api/users/current-user' )
    .set( 'Cookie', cookie )
    .send()
    .expect( 200 );

  expect( response.body.currentUser.email ).toEqual( 'test@test.com' );
} );

it( 'responds with null if not authenticated', async () => {
  const response = await request( app )
    .get( '/api/users/current-user' )
    .send()
    .expect( 200 );

  expect( response.body.currentUser ).toEqual( null );
} );