import { body } from 'express-validator';

const createSchema = [
  body( 'title' )
    .not()
    .isEmpty()
    .withMessage( 'Title is required' ),
];

export default createSchema;