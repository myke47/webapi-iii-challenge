const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');
const port = 5500;

const server = express();
server.use(express.json());
server.use(cors({}));

const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};

// TODO Custom MiddleWare //
const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, 'Name must be included', res);
    next();
  } else {
    next();
  }
};

// function logger(req, res, next) {

// };

// User Endpoints
server.get('/api/users', (req, res) => {
  users
  .get()
  .then(foundUsers => {
    res.json(foundUsers);
  })
  .catch(err => {
    return errorHelper(500, 'Database failure', res);
  });
});

server.post('/api/users', nameCheckMiddleware, (req, res) => {
  const { name } = req.body;
  users
  .insert({ name })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    return errorHelper(500, 'Database failure', res);
  });
});



module.exports = server;
server.listen(port, () => console.log(`Server listening on ${port}`));
