import { body } from 'express-validator';

const signinSchema = [
  body( 'email' )
    .isEmail()
    .withMessage( 'Email must be valid' ),
  body( 'password' )
    .trim()
    .notEmpty()
    .withMessage( 'You must supply a password' )
];

export default signinSchema;