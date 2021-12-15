import { CorePolicies, TaxonomyPolicies } from '@aspianet/common';
import request from 'supertest';
import { app } from '../../../app';

const createTaxonomies = async () => {
  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_cat_1 );
  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_nav );
  await request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData_tag );
}

it( 'can fetch a list of taxonomies', async () => {
  await createTaxonomies();

  const response = await request( app )
    .get( '/api/admin/taxonomies' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__LIST, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 200 );

  expect( response.body.length ).toEqual( 3 );
} );