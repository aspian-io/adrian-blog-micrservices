import { User } from "@models/user";
import basicDetails from "./basicDetails";

async function getAllUsers () {
  const users = await User.find();
  return users.map( x => basicDetails( x ) );
}

export default getAllUsers;