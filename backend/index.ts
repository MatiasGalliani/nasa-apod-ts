import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8000;
const originAllowed = process.env.ORIGIN_ALLOWED;

app.use(
  cors({
    origin: `${originAllowed}`,
  }),
);

type Apod = {
  title: string;
  explanation: string;
  url: string;
  date: string;
};

async function obtainAPOD() {
  if (!process.env.NASA_API_KEY) {
    throw new Error("The API key is missing");
  }

  const apiKey: string = process.env.NASA_API_KEY;

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("There was an error with the response");
  }

  const apod: Apod = await response.json();

  return apod;
}

app.get("/apod", async (req: Request, response: Response) => {
  try {
    const apod = await obtainAPOD();
    response.json(apod);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
