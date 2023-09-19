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

// Rotas públicas
router.post('/login', Login.login);
router.post('/user', UserController.store);

// Middleware que verifica o Token JWT
router.use(authenticationMiddleware);

// Rotas que apenas usuários autenticados e níveis de autorização maior ou igual 0 tem acesso.
// Rotas dos pacientes
router.get('/user', UserController.show);
router.put('/user', UserController.update);

// Middleware que permite apenas que a partir daqui apenas usuários
// com nível de autorização 1 ou maior tenham acesso
router.use(authorizationMiddlewareLevel1);

// Rotas dos médicos
router.get('/doctor', DoctorController.show);
router.put('/doctor', DoctorController.update);

// Middleware que permite apenas que a partir daqui apenas usuários
// com nível de autorização 2 ou maior tenham acessorouter.use(authorizationMiddlewareLevel2);
router.use(authorizationMiddlewareLevel2);

// Rotas exclusivas para administradores

// Admin
router.get('/admins', AdminController.index);
router.get('/admin', AdminController.show);
router.post('/admin', AdminController.store);
router.put('/admin', AdminController.update);
router.delete('/admin', AdminController.delete);

// Médico
router.get('/doctors', DoctorController.index);
router.post('/doctor', DoctorController.store);
router.delete('/doctor', DoctorController.delete);

// Paciente
router.get('/users', UserController.index);
router.delete('/user', UserController.delete);

router.use(errorMiddleware);
module.exports = router;
