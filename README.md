# Nasa APOD Generator - Typescript Version

Welcome to the Nasa APOD generator - Typescript Version!

I already developed the same endpoint but on GOLang, and now I wanted to test my skill in my second favorite language.

## Stack used

- Backend = Node.js, Express, Typescript
- Frontend = React, Vite, Typescript, Shadcn/UI

## What does it do?

Using an async function called _obtainAPOD_ obtains a json object that contains the following fields:

- Title of the APOD
- Explanation of what the APOD is about
- The URL that will contain the specific image
- The date of the APOD

After that, the application creates the route _"/apod"_ that will be called by the frontend using GET http method to execute the function _obtainAPOD_ and generate a json response.

The application runs on the server 8000.

## Frontend

The frontend was entirely developed using React, with Vite as builder.

I used the library Shadcn/UI to obtain that very square-like aesthetics.

## How to run it?

**Create environment variables**

You will need several environment variables, both for the front and backend.

**Frontend**
VITE_API_URL= (the url of the backend in production, but if it's not found, it will use the localhost:8000, so it's not completely necessary)

**Backend**
NASA_API_KEY= (this one is very important. It can be obtained on the Nasa's official website for developers at https://api.nasa.gov/)
ALLOWED_ORIGIN= (this is where you will add the allowed origins for CORS Policy)

Once you are done with that... You are ready to run the project!

**Backend**

```bash
git clone https://github.com/MatiasGalliani/nasa-apod-ts.git
cd backend
npm install
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Thanks to everyone for reading!**
