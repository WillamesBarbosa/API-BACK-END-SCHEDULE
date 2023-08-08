const Router = require('express');

const ScheduleController = require('./app/controllers/userController');

const router = Router();

router.get('/users', ScheduleController.index);
router.get('/users/:id', ScheduleController.show);
router.post('/users', ScheduleController.store);
router.post('/users/login', ScheduleController.login);
router.delete('/users/:id', ScheduleController.delete);
router.put('/users/:id', ScheduleController.update);

module.exports = router;
