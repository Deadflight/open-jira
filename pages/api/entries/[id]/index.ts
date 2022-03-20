import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry,IEntry } from '../../../../models'
import { db } from '../../../../database';

type Data = 
| { message: string }
| IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  // const { id } = req.query // Always is a string
  
  // if( !moongose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: 'Invalid id:' + id })
  // }

  switch(req.method) {
    case 'PUT':
      return updateEntry(req, res)

    case 'GET':
      return getEntry(req, res)

    default:
      return res.status(200).json({ message: "Method doesn't exist " + req.method })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query // Always is a string

  try {
    await db.connect()
    const entry = await Entry.findById(id)
    if(!entry) {
      await db.disconnect()
      return res.status(400).json({ message: 'Error no entry with the id: ' + id })
    }
    db.disconnect()
    return res.status(200).json( entry! )
  } catch (error: any) {
    await db.disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query // Always is a string
  const { status, description } = req.body

  if(!status || !description) {
    return res.status(400).json({ message: 'Missing data' })
  }

  try {
    await db.connect()
    const updatedEntry = await Entry.findByIdAndUpdate(id, { status, description }, { new: true, runValidators: true })
    if(!updatedEntry) {
      await db.disconnect()
      return res.status(400).json({ message: 'Error updating entry' + id })
    }
    db.disconnect()
    return res.status(200).json( updatedEntry! )
  } catch (error: any) {
    await db.disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }


  //   Wich is best to update?
  //   await db.connect()
  //   const entryToUpdate = await Entry.findById(id)

  //   if(!entryToUpdate) {
  //     await db.disconnect()
  //     return res.status(400).json({ message: 'Error updating entry' + id })
  //   }

  // const {
  //   status = entryToUpdate.status,
  //   description = entryToUpdate.description
  // } = req.body

  // try {
  //   const updatedEntry = await Entry.findByIdAndUpdate(id, { status, description }, { new: true, runValidators: true })
  //   await db.disconnect()
  //   return res.status(200).json( updatedEntry! ) // ! is a type assertion
  // } catch (error: any) {
  //   await db.disconnect()
  //   return res.status(400).json({ message: error.errors.status.message })
  // }
}