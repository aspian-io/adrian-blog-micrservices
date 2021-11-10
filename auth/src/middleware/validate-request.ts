import { RequestValidationError } from '@errors/request-validation-error';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
    throw new RequestValidationError( errors.array() );
  }

  next();
}