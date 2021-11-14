import { Request, Response } from 'express';
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

async function getCurrentUser ( req: Request, res: Response ) {
  res.send( { currentUser: req.currentUser || null } );
};

export default getCurrentUser;