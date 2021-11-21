import express from 'express';
import signoutController from '../controllers/signout.controller';
import signupController from '../controllers/signup.controller';
import signinController from '../controllers/signin.controller';
import currentUserController from '../controllers/current-user.controller';
import signupSchema from '../validation-schemas/signup-schema';
import signinSchema from '../validation-schemas/signin-schema';
import refreshTokenController from '../controllers/refresh-token.controller';
import { currentUser, validateRequest } from '@aspianet/common';

const userRouter = express.Router();

userRouter.post( '/signup', signupSchema, validateRequest, signupController );
userRouter.post( '/signin', signinSchema, validateRequest, signinController );
userRouter.post( '/signout', signoutController );
userRouter.get( '/current-user', currentUser, currentUserController );
userRouter.get( '/refresh-token', refreshTokenController );

export default userRouter;