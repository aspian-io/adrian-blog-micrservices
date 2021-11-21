import { CorePolicies, TaxonomyPolicies } from '@aspianet/common';
import request from 'supertest';
import { app } from '../../../app';

const createTaxonoy = () => {
  return request( app )
    .post( '/api/admin/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData );
}

it( 'can fetch a list of taxonomies', async () => {
  await createTaxonoy();
  await createTaxonoy();
  await createTaxonoy();

  const response = await request( app )
    .get( '/api/admin/taxonomies' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__LIST, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 200 );

  expect( response.body.length ).toEqual( 3 );
} );