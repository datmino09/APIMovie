const express = require("express");
const route = express.Router();
const RegisterController = require('../controller/RegisterController');
route.post('/',RegisterController.registerApp);
module.exports = route;