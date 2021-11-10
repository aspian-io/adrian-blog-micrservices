export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor ( message: string ) {
    super( message );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, CustomError.prototype );
  }

  abstract serializeErrors (): { message: string; field?: string }[];
}