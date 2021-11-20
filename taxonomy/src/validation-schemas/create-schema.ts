import { body } from 'express-validator';

const createSchema = [
  body( 'type' )
    .not()
    .isEmpty()
    .withMessage( 'type is required' ),
  body( 'term' )
    .not()
    .isEmpty()
    .withMessage( 'term is required' ),
  body( 'slug' )
    .not()
    .isEmpty()
    .withMessage( 'slug is required' ),
];

export default createSchema;