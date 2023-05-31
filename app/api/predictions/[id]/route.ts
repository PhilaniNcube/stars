import Replicate from 'replicate';
import { NextRequest, NextResponse } from 'next/server';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

const negative_prompt = 'disfigured, kitsch, ugly, oversaturated, greain, low-res, Deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, ugly, disgusting, poorly drawn, childish, mutilated, mangled, old, surreal, calligraphy, sign, writing, watermark, text, body out of frame, extra legs, extra arms, extra feet, out of frame, poorly drawn feet, cross-eye, blurry, bad anatomy'

export async function GET(request: Request,  context: any) {

  console.log(context)

  const prediction = await replicate.predictions.get(context.params.id)




if (prediction?.error) {
return  NextResponse.json({detail: prediction.error})
}

return NextResponse.json({prediction})



}
