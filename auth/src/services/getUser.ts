import { User } from "@models/user";
import { isValidObjectId } from "mongoose";

async function getUser ( id: string ) {
  if ( !isValidObjectId( id ) ) throw 'User not found';
  const user = await User.findById( id );
  if ( !user ) throw 'User not found';
  return user;
}

export default getUser;