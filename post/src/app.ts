import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@aspianet/common';
import postAdminRouter from './controllers/admin/routes/post-admin-router';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );

app.use( currentUser );
app.use( '/api/admin/posts', postAdminRouter );

app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );

app.use( errorHandler );

export { app };