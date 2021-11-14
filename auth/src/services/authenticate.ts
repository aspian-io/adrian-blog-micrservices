import { BadRequestError } from "@aspianet/common";
import Password from "../helpers/password";
import { Claim, ClaimDoc } from "../models/claim";
import { User } from "../models/user";
import basicDetails from "./basicDetails";
import generateJwtToken from "./generateJwtToken";
import generateRefreshToken from "./generateRefreshToken";
import getUserClaims from "./getUserClaims";


async function authenticate ( { email, password, ipAddress }: { email: string, password: string, ipAddress: string } ) {
  const user = await User.findOne( { email } ).populate( 'claims', 'claim', Claim );
  const claims = await getUserClaims( user?.id );

  if ( !user ) {
    throw new BadRequestError( 'Invalid Crendentials' );
  }

  const passwordsMatch = await Password.passwordCompare( user.password, password );
  if ( !passwordsMatch ) {
    throw new BadRequestError( 'Invalid Credentials' );
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken( user, claims );
  const refreshToken = generateRefreshToken( user, ipAddress );

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails( user ),
    jwtToken,
    refreshToken: refreshToken.token
  };
}

export default authenticate;