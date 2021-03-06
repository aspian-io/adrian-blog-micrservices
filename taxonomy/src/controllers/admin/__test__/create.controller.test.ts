import request from 'supertest';
import { app } from '../../../app';
import { Taxonomy } from '../../../models/taxonomy';
import { CorePolicies, TaxonomyPolicies } from '@aspianet/common';
import { natsWrapper } from '../../../nats-wrapper';

it( 'has a route handler listening to /api/taxonomies/create for post requests', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .send( {} );

  expect( response.status ).not.toEqual( 404 );
} );

it( 'can only be accessed if the user is signed in', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .send( {} );

  expect( response.status ).toEqual( 401 );
} );

it( 'returns a status other than 401 if the user is signed in', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [] ) )
    .send( {} );

  expect( response.status ).not.toEqual( 401 );
} );

it( 'returns a status other than 403 if the user is authorized', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {} );

  expect( response.status ).not.toEqual( 403 );
} );

it( 'returns an error if an invalid title is provided', async () => {
  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {
      title: '',
      description: ''
    } )
    .expect( 400 );

  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE ] ) )
    .send( {
      description: ''
    } )
    .expect( 400 );
} );

it( 'creates a taxonomy with valid inputs', async () => {
  let taxonomies = await Taxonomy.find( {} );
  expect( taxonomies.length ).toEqual( 0 );

  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  taxonomies = await Taxonomy.find( {} );
  expect( taxonomies.length ).toEqual( 1 );
  expect( taxonomies[ 0 ].type ).toEqual( global.test_taxonomyData_cat_1.type );
  expect( taxonomies[ 0 ].description ).toEqual( global.test_taxonomyData_cat_1.description );
  expect( taxonomies[ 0 ].term ).toEqual( global.test_taxonomyData_cat_1.term );
  expect( taxonomies[ 0 ].slug ).toEqual( global.test_taxonomyData_cat_1.slug );
} );

it( 'does not allow to save a duplicated taxonomy', async () => {
  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 400 );
} );

it( 'publishes an event', async () => {
  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  expect( natsWrapper.client.jetstream().publish ).toHaveBeenCalled();
} );