require('dotenv').config();
const express = require('express');
const massive = require('massive');
const authCtrl = require('./authController');
const ctrl = require('./controller');

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

//Authorize endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);

//Post Endpoints
app.get('/api/posts/', ctrl.getAllPosts);
app.get('/api/posts/:search/:authorId/:userPosts', ctrl.searchPosts);
app.get('/api/posts/:id', ctrl.getOnePost);
app.post('/api/post/:id', ctrl.addPost);
app.delete('/api/post/:id', ctrl.deletePost);


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is connected master')
  app.listen(SERVER_PORT, () => console.log(`Playing on server ${SERVER_PORT}`));
})
