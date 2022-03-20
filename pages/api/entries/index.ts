import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data = 
  | { message: string }
  | IEntry
  | IEntry[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEntries(res)
    
    case 'POST':
      return createEntry(req, res)
    default:
      res.status(400).json({ message: 'Endpoint not exist' })
  }

  res.status(200).json({ message: 'Example' })
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnect()

  res.status(200).json(entries)
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body

  const newEntry = new Entry({
    description,
    createdAt: Date.now()
  })

  try {
    await db.connect()
    await newEntry.save()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating entry' }) // Do not sen any information about the error to the client, sensitive information
  }

  await db.disconnect()
}