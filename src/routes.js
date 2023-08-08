const Router = require('express');

const ScheduleController = require('./app/controllers/userController');

const router = Router();

router.post('/login', ScheduleController.login);
router.post('/user', ScheduleController.store);

router.get('/users', ScheduleController.index);
router.get('/user', ScheduleController.show);
router.delete('/user/:id', ScheduleController.delete);
router.put('/user/:id', ScheduleController.update);

module.exports = router;
