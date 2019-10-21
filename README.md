# REST-API

This is a basic fake social network API with some users, working with a MongoDB database.

## Installation
1. To use this API, you have to clone this repository and install dependencies with the following command:
```
npm install
``` 

2. Then you have to setup a MongoDB database and create a .env file with this informations:
```
MONGO_DATABASE_URL=[Your MongoDB database URL]
PORT=[The port you want to listen your server]
```

3. This server is set to turn with **Nodemon**. If you don't want to use it, go to the `package.json` file and change the following line:
```json
{
  // ... //
  "scripts": {
    "start": " [The command you want to run your server] ",
  },
  // ... //
}
```

## Start the server
1. Launch your MongoDB server (if it's in your machine), and run your server with the following command:
```
npm start
```
