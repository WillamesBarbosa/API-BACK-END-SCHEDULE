const Router = require('express');

const ScheduleController = require('./app/controllers/scheduleController');

const router = Router();

router.get('/schedules', ScheduleController.index);
router.post('/schedules', ScheduleController.store);

module.exports = router;
