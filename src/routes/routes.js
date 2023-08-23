const Router = require('express');

const userController = require('../app/controllers/userController');
const { authorizationMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/login', userController.login);
router.post('/user', userController.store);

router.use(authorizationMiddleware);

router.get('/users', userController.index);
router.get('/user', userController.show);
router.delete('/user', userController.delete);
router.put('/user', userController.update);

module.exports = router;
