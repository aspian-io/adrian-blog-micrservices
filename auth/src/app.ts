import 'module-alias/register';
import express, { json } from 'express';
import 'express-async-errors';
import { errorHandler } from '@middleware/error-handler';
import userRouter from '@routes/user-router';
import { NotFoundError } from '@errors/not-found-error';
import cookieParser from 'cookie-parser';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );
app.use( cookieParser() );

app.use( '/api/users', userRouter );

app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );

app.use( errorHandler );

export { app };