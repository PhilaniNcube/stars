import Replicate from 'replicate';
import { NextRequest, NextResponse } from 'next/server';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})



export async function GET(request: Request,) {

const data = await request.json();

console.log(data);

return NextResponse.json({message: 'Hello'})

}
