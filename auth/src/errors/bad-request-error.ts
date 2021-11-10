import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor ( public message: string ) {
    super( message );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, BadRequestError.prototype );
  }

  serializeErrors () {
    return [ { message: this.message } ];
  }
}