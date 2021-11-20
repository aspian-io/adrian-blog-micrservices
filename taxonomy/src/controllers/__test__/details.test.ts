import { CorePolicies } from '@aspianet/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { TaxonomyPolicies } from '../../routes/taxonomy-policies';

it( 'returns a 404 if the taxonomy is not found', async () => {
  await request( app )
    .get( `/api/taxonomies/${ new mongoose.Types.ObjectId().toHexString() }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 404 );
} );

it( 'returns the taxonomy if the taxonomy is found', async () => {
  const response = await request( app )
    .post( '/api/taxonomies/create' )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ) )
    .send( global.test_taxonomyData )
    .expect( 201 );

  const taxonomyResponse = await request( app )
    .get( `/api/taxonomies/${ response.body.id }` )
    .set( 'authorization', global.test_signup( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ) )
    .send()
    .expect( 200 );

  expect( taxonomyResponse.body.term ).toEqual( global.test_taxonomyData.term );
  expect( taxonomyResponse.body.slug ).toEqual( global.test_taxonomyData.slug );
} );