/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useState } from 'react'

const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

const PromptForm = () => {

const [prediction, setPrediction] = useState(null)
const [error, setError] = useState(null)

const [image, setImage] = useState(null)

const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {

  e.preventDefault()

  const {prompt} = Object.fromEntries(new FormData(e.currentTarget))

  const response = await fetch("/api/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });

   let {prediction} = await response.json();

  console.log(prediction);



  if (response.status !== 200) {
    setError(prediction.detail);
    return;
  }

   setPrediction(prediction);

   let id = prediction.id;

    console.log(prediction.status);

while (prediction.status !== "succeeded" && prediction.status !== "failed") {

  await sleep(1000);

  const response = await fetch("/api/predictions/" + id);
  const data = await response.json();
  prediction = data.prediction;
    console.log("while loop", prediction);
  console.log(prediction)
  if (response.status !== 200) {
    setError(prediction.detail);
    return;
  }

  if (prediction.status === "succeeded") {
    setImage(prediction.output[0]);
     console.log("completed", prediction);
       setPrediction(prediction);

  }

    setPrediction(prediction);

}
}

  return (
    <div className="w-full max-w-4xl mx-auto my-10">
      <h1 className="text-center">Generate Images</h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 mt-3">
          <Label htmlFor="prompt">Prompt</Label>
          <div className="flex w-full">
            <Input
              id="prompt"
              name="prompt"
              type="text"
              placeholder=""
              className="rounded-l-md rounded-r-none focus-visible:ring-0"
            />
            <Button type="submit" className="rounded-l-none rounded-r-md">Go!</Button>
          </div>
        </div>
      </form>
      <div className="w-full">
        {image === null ? "Generating image..." : <img src={image} className="w-full aspect-square object-cover" alt="Image"/>}
      </div>
    </div>
  );
}

export default PromptForm
