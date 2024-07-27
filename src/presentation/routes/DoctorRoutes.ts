import { Router } from 'express';
import DoctorController from '../../infra/controllers/DoctorController';

const doctorRoutes = Router();

const doctorController = new DoctorController();

doctorRoutes.post('/', doctorController.create);
doctorRoutes.get('/', doctorController.list);
doctorRoutes.get('/:id', doctorController.findById);
doctorRoutes.get('/doctors', doctorController.findByFilters);
doctorRoutes.patch('/:id', doctorController.update);
doctorRoutes.delete('/:id', doctorController.delete);

export default doctorRoutes;
