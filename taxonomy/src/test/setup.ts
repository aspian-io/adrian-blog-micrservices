import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { TaxonomyTypeEnum } from '@aspianet/common';

//jest.setTimeout( 200000 );

declare global {
  var test_signup: ( policies: string[] ) => string;
  var test_taxonomyData_cat_1: { type: TaxonomyTypeEnum, description: string, term: string, slug: string };
  var test_taxonomyData_cat_2: { type: TaxonomyTypeEnum, description: string, term: string, slug: string };
  var test_taxonomyData_nav: { type: TaxonomyTypeEnum, description: string, term: string, slug: string };
  var test_taxonomyData_tag: { type: TaxonomyTypeEnum, description: string, term: string, slug: string };
}

jest.mock( '../nats-wrapper' );

let mongo: any;
beforeAll( async () => {
  process.env.JWT_KEY = 'asdfg';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect( mongoUri );
} );

beforeEach( async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for ( let collection of collections ) {
    await collection.deleteMany( {} );
  }
} );

afterAll( async () => {
  await mongo.stop();
  await mongoose.connection.close();
} );

global.test_signup = ( policies: string[] ) => {
  const payload = {
    id: new mongoose.Types.ObjectId(),
    email: 'test@test.com',
    claims: policies
  }

  const token = jwt.sign( payload, process.env.JWT_KEY! );

  return token;
};

global.test_taxonomyData_cat_1 = {
  type: TaxonomyTypeEnum.CATEGORY,
  description: "",
  term: "test category 1",
  slug: "test-category-1",
};

global.test_taxonomyData_cat_2 = {
  type: TaxonomyTypeEnum.CATEGORY,
  description: "",
  term: "test category 2",
  slug: "test-category-2",
};

global.test_taxonomyData_nav = {
  type: TaxonomyTypeEnum.NAV_MENU,
  description: "",
  term: "test nav 1",
  slug: "test-nav-1",
};

global.test_taxonomyData_tag = {
  type: TaxonomyTypeEnum.TAG,
  description: "",
  term: "test tag 1",
  slug: "test-tag-1",
};
