import { RefreshToken } from "../models/refresh-token";
import getUser from "./getUser";

async function getRefreshTokens ( userId: string ) {
  // check that user exists
  await getUser( userId );

  // return refresh tokens for user
  const refreshTokens = await RefreshToken.find( { user: userId } );
  return refreshTokens;
}

export default getRefreshTokens;