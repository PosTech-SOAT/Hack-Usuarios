import { Router } from 'express';
import userRoutes from './routes/UserRoutes';
import doctorRoutes from './routes/DoctorRoutes';
import patientRoutes from './routes/PatientRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);

export default router;
