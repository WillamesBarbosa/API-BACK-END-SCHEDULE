const Router = require('express');

const ScheduleController = require('../app/controllers/userController');
const { authorizationMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/login', ScheduleController.login);
router.post('/user', ScheduleController.store);

router.use(authorizationMiddleware);

router.get('/users', ScheduleController.index);
router.get('/user', ScheduleController.show);
router.delete('/user/:id', ScheduleController.delete);
router.put('/user/:id', ScheduleController.update);

module.exports = router;
