import { BadRequestError } from "@aspianet/common";
import { RefreshToken } from "../models/refresh-token";

async function getRefreshToken ( token: string ) {
  const refreshToken = await RefreshToken.findOne( { token } ).populate( 'user' );
  if ( !refreshToken || !refreshToken.isActive ) throw new BadRequestError( 'Invalid Token' );
  return refreshToken;
}

export default getRefreshToken;