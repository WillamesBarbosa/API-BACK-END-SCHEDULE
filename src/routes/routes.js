const Router = require('express');

const userController = require('../app/controllers/userController');
const doctorController = require('../app/controllers/doctorController');

const { authenticationMiddleware } = require('../middlewares/authenticationMiddleware');

const router = Router();

router.post('/login', userController.login);
router.post('/user', userController.store);
router.post('/doctor', doctorController.store);

router.use(authenticationMiddleware);

router.get('/users', userController.index);
router.get('/user', userController.show);
router.delete('/user', userController.delete);
router.put('/user', userController.update);

module.exports = router;
