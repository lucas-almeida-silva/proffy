import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesConstroller = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesConstroller.index);
routes.post('/classes', classesConstroller.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;