import express from 'express';
import AuthController from './controllers/AuthController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UserController from './controllers/UsersController';
import authMiddleware from './middlewares/auth';
import TeachersController from './controllers/TeacherController';
import StudentsController from './controllers/StudentController';

const routes = express.Router();

const authController = new AuthController();
const classesConstroller = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UserController();
const studentsController = new StudentsController();
const teachersController = new TeachersController();


routes.post('/users/register', usersController.create);

routes.post('/login', authController.login);
routes.post('/forgot-password', authController.forgotPassword);
routes.post('/reset-password', authController.resetPassword);

routes.use(authMiddleware);

routes.get('/users/:id', usersController.index);
routes.put('/users', usersController.update);

routes.get('/teachers/:id', teachersController.index);
routes.put('/teachers', teachersController.update);

routes.get('/classes', classesConstroller.index);
routes.post('/classes', classesConstroller.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);


export default routes;