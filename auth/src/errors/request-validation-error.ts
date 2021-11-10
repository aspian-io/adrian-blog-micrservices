import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor ( public errors: ValidationError[] ) {
    super( 'Invalid request parameters' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, RequestValidationError.prototype );
  }

  serializeErrors () {
    return this.errors.map( err => {
      return { message: err.msg, field: err.param };
    } );
  }
}