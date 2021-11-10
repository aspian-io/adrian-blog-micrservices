import basicDetails from "./basicDetails";
import generateJwtToken from "./generateJwtToken";
import generateRefreshToken from "./generateRefreshToken";
import getRefreshToken from "./getRefreshToken";
import getUserClaims from "./getUserClaims";

async function refreshToken ( { token, ipAddress }: { token: string, ipAddress: string } ) {
  const refreshToken = await getRefreshToken( token );
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken( user, ipAddress );
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  const claims = await getUserClaims( user.id );

  // generate new jwt
  const jwtToken = generateJwtToken( user, claims );

  // return basic details and tokens
  return {
    ...basicDetails( user ),
    jwtToken,
    refreshToken: newRefreshToken.token
  };
}

export default refreshToken;