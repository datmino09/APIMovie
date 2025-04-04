const express = require("express");
const route = express.Router();
const LoginController = require('../controller/LoginController');
route.post('/',LoginController.loginApp);
module.exports = route;