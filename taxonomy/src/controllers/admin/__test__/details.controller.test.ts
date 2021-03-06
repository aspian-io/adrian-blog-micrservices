import { CorePolicies, TaxonomyPolicies } from '@aspianet/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';

it( 'returns a 404 if the taxonomy is not found', async () => {
  await request( app )
    .get( `/api/admin/taxonomies/${ new mongoose.Types.ObjectId().toHexString() }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 404 );
} );

it( 'returns the taxonomy if the taxonomy is found', async () => {
  const response = await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 )
    .expect( 201 );

  const taxonomyResponse = await request( app )
    .get( `/api/admin/taxonomies/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 200 );

  expect( taxonomyResponse.body.term ).toEqual( global.test_taxonomyData_cat_1.term );
  expect( taxonomyResponse.body.slug ).toEqual( global.test_taxonomyData_cat_1.slug );
} );