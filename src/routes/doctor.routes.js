const Router = require('express');

const doctorController = require('../app/controllers/doctorController');

const route = Router();

route.post('/doctor', doctorController.create);

module.exports = route;
