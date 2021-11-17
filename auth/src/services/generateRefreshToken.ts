import { RefreshToken } from "../models/refresh-token";
import { UserDoc } from "../models/user";
import randomTokenString from "./randomTokenString";

function generateRefreshToken ( user: UserDoc, ipAddress: string ) {
  // create a refresh token that expires in 7 days

  return RefreshToken.build( {
    user: user.id,
    token: randomTokenString(),
    expires: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ),
    createdByIp: ipAddress
  } );
}

export default generateRefreshToken;