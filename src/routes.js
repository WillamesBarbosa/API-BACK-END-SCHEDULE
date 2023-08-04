const Router = require('express');

const ScheduleController = require('./app/controllers/scheduleController');

const router = Router();

router.get('/schedules', ScheduleController.findAll);

module.exports = router;
