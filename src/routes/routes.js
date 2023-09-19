const Router = require('express');

const UserController = require('../app/controllers/userController');
const DoctorController = require('../app/controllers/doctorController');
const Login = require('../app/controllers/loginController');
const AdminController = require('../app/controllers/adminController');

const { authenticationMiddleware } = require('../middlewares/authenticationMiddleware');
const { authorizationMiddlewareLevel1 } = require('../middlewares/authorizationMiddlewareLevel1');
const { authorizationMiddlewareLevel2 } = require('../middlewares/authorizationMiddlewareLevel2');
const { errorMiddleware } = require('../middlewares/errorMiddleware');

const router = Router();

router.post('/login', Login.login);
router.post('/user', UserController.store);

router.use(authenticationMiddleware);

router.get('/user', UserController.show);
router.put('/user', UserController.update);

router.use(authorizationMiddlewareLevel1);
router.get('/doctor', DoctorController.show);
router.put('/doctor', DoctorController.update);

router.use(authorizationMiddlewareLevel2);
router.get('/admin', AdminController.show);

router.get('/admins', AdminController.index);
router.post('/admin', AdminController.store);
router.put('/admin', AdminController.update);
router.delete('/admin', AdminController.delete);
router.post('/doctor', DoctorController.store);
router.get('/doctors', DoctorController.index);
router.get('/users', UserController.index);
router.delete('/user', UserController.delete);
router.delete('/doctor', DoctorController.delete);

router.use(errorMiddleware);
module.exports = router;
