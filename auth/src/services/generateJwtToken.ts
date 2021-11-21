import { UserDoc } from "../models/user";
import jwt from 'jsonwebtoken';

function generateJwtToken ( user: UserDoc, claims: string[] ) {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign( { sub: user.id, id: user.id, email: user.email, claims }, process.env.JWT_KEY!, { expiresIn: '15m' } );
}

export default generateJwtToken;