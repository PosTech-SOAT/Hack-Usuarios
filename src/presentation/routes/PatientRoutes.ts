import { Router } from 'express';
import PatientController from '../../infra/controllers/PatientController';

const patientRoutes = Router();

const patientController = new PatientController();

patientRoutes.post('/', patientController.create);
patientRoutes.get('/', patientController.list);
patientRoutes.get('/:id', patientController.findById);
patientRoutes.patch('/:id', patientController.update);
patientRoutes.delete('/:id', patientController.delete);

export default patientRoutes;
