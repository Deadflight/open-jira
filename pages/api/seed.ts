import type { NextApiRequest, NextApiResponse } from 'next'
import { db,seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production' ){
    return res.status(401).json({ message: "Don't have access to this service"})
  }

  // Conectamos por primera vez a la base de datos
  try {
    await db.connect();
    await Entry.deleteMany(); // delete all entries carefull
    await Entry.insertMany(seedData.entries)
    await db.disconnect();
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message })
  }


  res.status(200).json({ message: 'Proccess done correctly' })
}