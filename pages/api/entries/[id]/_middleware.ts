import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import moongose from 'mongoose';

export function middleware(req: NextRequest, event: NextFetchEvent) {
  
  const id = req.page.params?.id || '';

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");


  if( !checkMongoIDRegExp ) {
    // return res.status(400).json({ message: 'Invalid id:' + id })
    return new Response( JSON.stringify({ message: 'Invalid id:' + id }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}