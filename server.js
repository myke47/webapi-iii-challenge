const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');
const port = 5000;

const server = express();
server.use(express.json());
server.use(cors({}));

const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};

// TODO Custom MiddleWare //


function logger(req, res, next) {

};

// Endpoints
server.get('/api/users', (req, res) => {
  users
  .get()
  .then(foundUsers => {
    res.json(foundUsers);
  })
  .catch(err => {
    return errorHelper(500, 'Database not found', res);
  });
});



module.exports = server;
