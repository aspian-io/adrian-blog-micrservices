import express from 'express';
import signout from '../controllers/signout';
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import getCurrentUser from '../controllers/current-user';
import signupSchema from '../validation-schemas/signup-schema';
import signinSchema from '../validation-schemas/signin-schema';
import refreshToken from '../controllers/refresh-token';
import { currentUser, validateRequest } from '@aspianet/common';

const userRouter = express.Router();

userRouter.post( '/signup', signupSchema, validateRequest, signup );
userRouter.post( '/signin', signinSchema, validateRequest, signin );
userRouter.post( '/signout', signout );
userRouter.get( '/current-user', currentUser, getCurrentUser );
userRouter.get( '/refresh-token', refreshToken );

export default userRouter;