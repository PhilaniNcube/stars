import Replicate from 'replicate';
import { NextRequest, NextResponse } from 'next/server';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

const negative_prompt = 'disfigured, kitsch, ugly, oversaturated, greain, low-res, Deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, ugly, disgusting, poorly drawn, childish, mutilated, mangled, old, surreal, calligraphy, sign, writing, watermark, text, body out of frame, extra legs, extra arms, extra feet, out of frame, poorly drawn feet, cross-eye, blurry, bad anatomy'

export async function POST(request: Request, ) {

  const {prompt} = await request.json()

const prediction = await replicate.predictions.create({
  version: '0811c180fda25df2c99f6a70c5c311a789689220bf87658a23c02ae1a7a4f2c6',
  input: {prompt: prompt, negative_prompt, width: 768, height:512},
  webhook: 'https://07a3-102-33-124-98.in.ngrok.io/api/replicate-webhook',
   webhook_events_filter: ["completed"]
})


if (prediction?.error) {
return  NextResponse.json({detail: prediction.error})
}


return NextResponse.json({prediction})



}
