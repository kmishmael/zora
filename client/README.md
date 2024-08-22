# Zora System
This is the frontend, written in NextJS with typescript and TailwindCSS.
### Prerequisites
 - [NodeJS](https://nodejs.org/en)
 - [Uploadthing](https://uploadthing.com/) Account

In a new terminal, go to the `client` folder, lets install the dependencies we need with `npm`
```bash
npm install
```

once that is done, create a file called `.env.local` in client folder. That content it will contain is:
```bash
NEXT_PUBLIC_API_URL="http://127.0.0.1:5000"
UPLOADTHING_SECRET=YOUR_UPLOADTHING_SECRET
UPLOADTHING_APP_ID=YOUR_UPLOADTHING_APP_ID
NEXTAUTH_SECRET=NEXTAUTH_SECRET
NEXTAUTH_URL=http://localhost:3000
```

replace the values appropriately.

Now, in mind that the backend is running in the other terminal, now lets run the frontend in development mode
```bash
npm run dev
```

There are other commands that you can run with npm, these are avaialable for your pleasure in  `package.json`

