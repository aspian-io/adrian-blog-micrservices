import { BadRequestError } from "@errors/bad-request-error";
import { RefreshToken } from "@models/refresh-token";

async function getRefreshToken ( token: string ) {
  const refreshToken = await RefreshToken.findOne( { token } ).populate( 'user' );
  if ( !refreshToken || !refreshToken.isActive ) throw 'Invalid token';
  return refreshToken;
}

export default getRefreshToken;