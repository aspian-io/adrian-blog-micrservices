import express, { json } from 'express';
import 'express-async-errors';
import { errorHandler } from '@aspianet/common';
import { NotFoundError } from '@aspianet/common';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );

app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );

app.use( errorHandler );

export { app };