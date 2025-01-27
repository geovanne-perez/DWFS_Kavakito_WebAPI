const {response, request} = require('express');

const userGet = (req, res) => {
    res.send('API get response');
  };

const userPost = (req, res) => {
    res.send('API post response');
  };

const userPut = (req, res) => {
    res.send('API put response');
  };

const userDelete = (req, res) => {
    res.send('API delete response');
  };


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
  };
  