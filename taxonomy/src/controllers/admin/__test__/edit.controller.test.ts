import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';
import { CorePolicies, TaxonomyPolicies, TaxonomyTypeEnum } from '@aspianet/common';
import { natsWrapper } from '../../../nats-wrapper';

it( 'returns 404 if the provided id does not exist', async () => {
  await request( app )
    .put( `/api/admin/taxonomies/edit/${ new mongoose.Types.ObjectId().toHexString() }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 404 );
} );

it( 'returns 401 if the user is not authenticated', async () => {
  await request( app )
    .put( `/api/admin/taxonomies/edit/${ new mongoose.Types.ObjectId().toHexString() }` )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 401 );
} );

it( 'returns 403 if the user is not authorized', async () => {
  await request( app )
    .put( `/api/admin/taxonomies/edit/${ new mongoose.Types.ObjectId().toHexString() }` )
    .set( 'authorization', global.test_signup( [ CorePolicies.CoreClaims__USER ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 403 );
} );

it( 'returns a 400 if the user provides an invalid inputs', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  await request( app )
    .put( `/api/admin/taxonomies/edit/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( {
      type: TaxonomyTypeEnum.CATEGORY,
      description: "",
      term: "",
      slug: "test-category-1",
    } )
    .expect( 400 );
} );

it( 'return 400 if the user provides a duplicated taxonomy', async () => {
  const response1 = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  const response2 = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_2 )
    .expect( 201 );

  await request( app )
    .put( `/api/admin/taxonomies/edit/${ response1.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_2 )
    .expect( 400 );
} );

it( 'updates the taxonomy provided valid inputs', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  await request( app )
    .put( `/api/admin/taxonomies/edit/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( {
      type: TaxonomyTypeEnum.CATEGORY,
      description: "",
      term: "test category 1 edited",
      slug: "test-category-1-edited",
    } )
    .expect( 200 );

  const taxonomyResponse = await request( app )
    .get( `/api/admin/taxonomies/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ) )
    .send();

  expect( taxonomyResponse.body.term ).toEqual( "test category 1 edited" );
  expect( taxonomyResponse.body.slug ).toEqual( "test-category-1-edited" );
} );

it( 'publishes an event', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  await request( app )
    .put( `/api/admin/taxonomies/edit/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( {
      type: TaxonomyTypeEnum.CATEGORY,
      description: "",
      term: "test category 1 edited",
      slug: "test-category-1-edited",
    } )
    .expect( 200 );

  expect( natsWrapper.client.jetstream().publish ).toHaveBeenCalled();
} );