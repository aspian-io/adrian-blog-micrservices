import { Post } from "../../models/post";
import { Request, Response, NextFunction } from 'express';

async function listController ( req: Request, res: Response, next: NextFunction ) {
  const posts = await Post.find( {} );

  res.send( posts );
}

export default listController;