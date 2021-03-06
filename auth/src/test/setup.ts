import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//jest.setTimeout( 200000 );

declare global {
  var test_signup: ( policies: string[] ) => string;
}

let mongo: any;
beforeAll( async () => {
  process.env.JWT_KEY = 'asdfg';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect( mongoUri );
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

global.test_signup = ( policies: string[] ) => {
  const payload = {
    id: new mongoose.Types.ObjectId(),
    email: 'test@test.com',
    claims: policies
  }

  const token = jwt.sign( payload, process.env.JWT_KEY! );

  return token;
};
