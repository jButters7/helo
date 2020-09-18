require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./authController');
const ctrl = require('./controller');

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 } //One year long cookie
}))

//Authorize endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/api/auth/me', authCtrl.getUser);
app.delete('/auth/logout', authCtrl.logout);

//Post Endpoints
app.get('/api/posts/', ctrl.getAllPosts);
app.get('/api/posts/:search/:userPosts', ctrl.searchPosts);
app.get('/api/posts/:id', ctrl.getOnePost);
app.post('/api/posts/', ctrl.addPost);
app.delete('/api/post/:id', ctrl.deletePost);


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is connected master')
  app.listen(SERVER_PORT, () => console.log(`Playing on server ${SERVER_PORT}`));
})
