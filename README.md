# Zora

This is a sales management system. The fronted is written in NextJS, with Typescript while the backend is written in Flask, Python.

To run it
## Backend
### Prerequisites
To run this section of the project, you need to have the following installed in your machine:
 - Python
 - Mysql

First we need to install the dependencies. I recommend that you use a virtual environment for this.
Let's do the installation in the `api-gateway` folder:

```bash
pip install -r requirements.txt
```

Once that is done, now let's create our database. Use mysql cli tool to create the database. Name it as you prefer. I recommend naming it `zora` but that's entirely up to you.
login to mysql using cli tool

```bash
mysql -u YOUR_USERNAME_HERE -p
```
replace your username with the appropriate one and you'll be prompted to input the password. Once you are in, create the database. Run this SQL command to create it
```sql
CREATE DATABASE zora;
```
once you are done, now lets add the environment variables. In the folder `api-gateway`, create a file called `.env` and it will have the following data:
```bash
DATABASE_USER=YOUR_USERNAME
DATABASE_PASSWORD=YOUR_PASSWORD
DATABASE_HOST=127.0.0.1:3306
DATABASE_NAME=zora
```
replace the values appropriately in line with your installation.

Finally, we can now run the project. To run it use the command
```bash
flask run
```

It should now start the server running on port, mostly `5000`

## FrontEnd
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

