import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor () {
    super( 'Route not found' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, NotFoundError.prototype );
  }

  serializeErrors () {
    return [ { message: 'Not Found' } ];
  }
}