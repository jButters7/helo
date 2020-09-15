require('dotenv').config();
const express = require('express');
const massive = require('massive');

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is connected master')
  app.listen(SERVER_PORT, () => console.log(`Playing on server ${SERVER_PORT}`));
})
