export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  displayName: string;
  bio: string;
  avatar: string;
  jwtToken: string;
}

export interface IUserFormValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}