import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { CorePolicies, TaxonomyPolicies } from '@aspianet/common';

it( 'returns 404 if the provided taxonomy id does not exist', async () => {
  await request( app )
    .delete( `/api/admin/taxonomies/delete/${ new mongoose.Types.ObjectId().toHexString() }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DELETE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( {} )
    .expect( 404 );
} );

it( 'returns 401 if the user is not authenticated', async () => {
  await request( app )
    .delete( `/api/admin/taxonomies/delete/${ new mongoose.Types.ObjectId().toHexString() }` )
    .send( {} )
    .expect( 401 );
} );

it( 'returns 403 if the user is not authorized', async () => {
  await request( app )
    .delete( `/api/admin/taxonomies/delete/${ new mongoose.Types.ObjectId().toHexString() }` )
    .set( 'authorization', global.test_signup( [ CorePolicies.CoreClaims__USER ] ) )
    .send( {} )
    .expect( 403 );
} );

it( 'returns a 400 if the user provides an invalid taxonomy id', async () => {
  await request( app )
    .delete( '/api/admin/taxonomies/delete/asdfadfasfdafafds' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DELETE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( {} )
    .expect( 400 );
} );

it( 'deletes the taxonomy provided valid and existed taxonomy id', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData )
    .expect( 201 );

  await request( app )
    .delete( `/api/admin/taxonomies/delete/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DELETE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( {} )
    .expect( 200 );

  await request( app )
    .get( `/api/admin/taxonomies/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 404 );
} );