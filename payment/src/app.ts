import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@aspianet/common';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );

app.use( currentUser );
//app.use( '/api/admin/taxonomies', taxonomyAdminRouter );

app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );

app.use( errorHandler );

export { app };