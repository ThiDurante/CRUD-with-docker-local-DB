const express = require('express');
const emailValidator = require('../middlewares/emailValidator');
const passwordValidator = require('../middlewares/passwordValidator');
const generateToken = require('../utils/tokenGenerator');

const loginRouter = express.Router();

loginRouter.post('/', emailValidator, passwordValidator, (_req, res) => {
  const token = generateToken();
  res.status(200).json({
    token,
  });
});

module.exports = loginRouter;
