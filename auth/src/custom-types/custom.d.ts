export interface UserPayload {
  id: string;
  email: string;
  role: string;
  claims: string[];
  ownsToken?: boolean
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}