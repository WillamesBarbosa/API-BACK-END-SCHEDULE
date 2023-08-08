const Router = require('express');

const ScheduleController = require('./app/controllers/userController');

const router = Router();

router.get('/schedules', ScheduleController.index);
router.get('/schedules/:id', ScheduleController.show);
router.post('/schedules', ScheduleController.store);
router.post('/schedules/login', ScheduleController.login);
router.delete('/schedules/:id', ScheduleController.delete);
router.put('/schedules/:id', ScheduleController.update);

module.exports = router;
