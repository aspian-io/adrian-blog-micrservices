import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';
import { TaxonomyPolicies } from '../routes/taxonomy-policies';

//jest.setTimeout( 200000 );

declare global {
  var signup: ( policies: TaxonomyPolicies[] ) => string;
}

let mongo: any;
beforeAll( async () => {
  process.env.JWT_KEY = 'asdfg';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect( mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } )
} );

beforeEach( async () => {
  const collections = await mongoose.connection.db.collections();

  for ( let collection of collections ) {
    await collection.deleteMany( {} );
  }
} );

afterAll( async () => {
  await mongo.stop();
  await mongoose.connection.close();
} );

global.signup = ( policies: TaxonomyPolicies[] ) => {
  const payload = {
    id: mongoose.Types.ObjectId(),
    email: 'test@test.com',
    claims: policies
  }

  const token = jwt.sign( payload, process.env.JWT_KEY! );

  return token;
};
