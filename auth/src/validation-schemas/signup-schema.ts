import { body } from 'express-validator';

const signupSchema = [
  body( 'firstName' )
    .trim()
    .notEmpty()
    .withMessage( 'You must enter your first name' ),
  body( 'lastName' )
    .trim()
    .notEmpty()
    .withMessage( 'You must enter your last name' ),
  body( 'email' )
    .isEmail()
    .withMessage( 'Email must be valid' ),
  body( 'password' )
    .trim()
    .isLength( { min: 4, max: 20 } )
    .withMessage( 'You must supply a password being between 4 and 20 characters' )
];

export default signupSchema;