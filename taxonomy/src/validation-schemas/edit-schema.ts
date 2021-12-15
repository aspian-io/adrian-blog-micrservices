import { body } from 'express-validator';

const editSchema = [
  body( 'type' )
    .not()
    .isEmpty()
    .withMessage( 'type is required' ),
  body( 'term' )
    .not()
    .isEmpty()
    .withMessage( 'term is required' )
    .isLength( { max: 60 } )
    .withMessage( `term's length must be more than 1 and up to 60` ),
];

export default editSchema;