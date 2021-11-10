import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

jest.setTimeout( 200000 );

declare global {
  var signup: () => Promise<string[]>;
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

global.signup = async () => {
  const firstName = "fName";
  const lastName = "lName";
  const email = 'test@test.com';
  const password = 'password';

  const response = await request( app )
    .post( '/api/users/signup' )
    .send( {
      firstName, lastName, email, password
    } )
    .expect( 201 );

  const cookie = response.get( 'Set-Cookie' );

  return cookie;
};
