import { Claim, ClaimDoc } from "@models/claim";
import { User } from "@models/user";
import getUser from "./getUser";

async function getUserClaims ( userId: string ): Promise<string[]> {
  const claims: string[] = [];
  const user = await User.findById( userId ).populate( 'claims', 'claim', Claim );
  user?.claims?.forEach( ( c: ClaimDoc ) => {
    claims.push( c.claim )
  } );

  return claims;
}

export default getUserClaims;