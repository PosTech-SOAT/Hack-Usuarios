import { Router } from 'express';
import UserController from '../../infra/controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.list);
userRoutes.get('/:id', userController.findById);
userRoutes.patch('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);

export default userRoutes;
