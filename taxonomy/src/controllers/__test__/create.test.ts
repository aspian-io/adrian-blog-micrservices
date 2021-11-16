import request from 'supertest';
import { app } from '../../app';
import { TaxonomyPolicies } from '../../routes/taxonomy-policies';

it( 'has a route handler listening to /api/taxonomies/create for post requests', async () => {
  const response = await request( app )
    .post( '/api/taxonomies/create' )
    .send( {} );

  expect( response.status ).not.toEqual( 404 );
} );

it( 'can only be accessed if the user is signed in', async () => {
  const response = await request( app )
    .post( '/api/taxonomies/create' )
    .send( {} );

  expect( response.status ).toEqual( 401 );
} );

it( 'returns a status other than 401 if the user is signed in', async () => {
  const response = await request( app )
    .post( '/api/taxonomies/create' )
    .set( 'authorization', global.signup( [] ) )
    .send( {} );

  expect( response.status ).not.toEqual( 401 );
} );

it( 'returns a status other than 403 if the user is authorized', async () => {
  const response = await request( app )
    .post( '/api/taxonomies/create' )
    .set( 'authorization', global.signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {} );

  expect( response.status ).not.toEqual( 403 );
} );

it( 'returns an error if an invalid title is provided', async () => {
  await request( app )
    .post( '/api/taxonomies/create' )
    .set( 'authorization', global.signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {
      title: '',
      description: ''
    } )
    .expect( 400 );

  await request( app )
    .post( '/api/taxonomies/create' )
    .set( 'authorization', global.signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {
      description: ''
    } )
    .expect( 400 );
} );

it( 'creates a taxonomy with valid inputs', async () => {
  // add in a check to make sure a taxonomy was saved

  await request( app )
    .post( '/api/taxonomies/create' )
    .set( 'authorization', global.signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {
      title: 'test title',
      description: ''
    } )
    .expect( 201 );
} );