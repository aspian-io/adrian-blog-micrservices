import getRefreshToken from "./getRefreshToken";

async function revokeToken ( { token, ipAddress }: { token: string, ipAddress: string } ) {
  const refreshToken = await getRefreshToken( token );

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}

export default revokeToken;