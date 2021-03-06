# REST API by LR

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
  /* ... */
  "scripts": {
    "start": " [The command you want to run your server] ",
  },
  /* ... */
}
```

## Start the server
Launch your MongoDB server (if it's in your machine), and run your server with the following command:
```
npm start
```

## Testing requests
To test the request in your API, you can use Postman, or the `.rest` files in the [/api/routes](https://github.com/LR-LR/rest_api/tree/master/api/routes) folder. To use this files, you'll have to install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in [VSCode](https://code.visualstudio.com/) (read [REST Client's documentation](https://github.com/Huachao/vscode-restclient#usage) to know more).
