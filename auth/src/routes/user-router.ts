import express from 'express';
import { validateRequest } from '@middleware/validate-request';
import signout from '@controllers/signout';
import signup from '@controllers/signup';
import signin from '@controllers/signin';
import { currentUser } from '@middleware/current-user';
import getCurrentUser from '@controllers/current-user';
import signupSchema from '@validation-schemas/signup-schema';
import signinSchema from '@validation-schemas/signin-schema';
import refreshToken from '@controllers/refresh-token';
import { authorize } from '@middleware/authorize';
const userRouter = express.Router();

userRouter.post( '/signup', signupSchema, validateRequest, signup );
userRouter.post( '/signin', signinSchema, validateRequest, signin );
userRouter.post( '/signout', signout );
userRouter.get( '/current-user', currentUser, getCurrentUser );
userRouter.get( '/refresh-token', refreshToken );

export default userRouter;