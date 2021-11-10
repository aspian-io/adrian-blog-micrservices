import basicDetails from "./basicDetails";
import getUser from "./getUser";

async function getUserById ( id: string ) {
  const user = await getUser( id );
  return basicDetails( user );
}

export default getUserById;