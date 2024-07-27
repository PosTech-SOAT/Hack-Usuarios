import { container } from 'tsyringe';
import { DoctorRepository } from '../DoctorRepository';
import { PatientRepository } from '../PatientRepository';
import { UserRepository } from '../UserRepository';

container.register('UserRepository', {
	useClass: UserRepository,
});

container.register('DoctorRepository', {
	useClass: DoctorRepository,
});

container.register('ProductRepository', {
	useClass: PatientRepository,
});
