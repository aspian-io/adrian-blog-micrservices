import { UserDoc } from "../models/user";

function basicDetails ( user: UserDoc ) {
  const { firstName, lastName, email } = user;
  return { firstName, lastName, email };
}

export default basicDetails;