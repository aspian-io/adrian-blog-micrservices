import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor () {
    super( 'Not Authorized' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, NotAuthorizedError.prototype );
  }

  serializeErrors () {
    return [ { message: 'Not Authorized' } ];
  }
}