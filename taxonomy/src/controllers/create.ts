import express, { Request, Response } from 'express';

async function create ( req: Request, res: Response ) {
  res.sendStatus( 200 );
}

export default create;