import { container } from 'tsyringe';
import { IUserRepository } from '../../../domain/interfaces/repositories/IUserRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { IDoctorRepository } from '../../../domain/interfaces/repositories/IDoctorRepository';
import { DoctorRepository } from '../../../domain/repositories/DoctorRepository';
import { IPatientRepository } from '../../../domain/interfaces/repositories/IPatientRespository';
import { PatientRepository } from '../../../domain/repositories/PatientRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IDoctorRepository>(
	'DoctorRepository',
	DoctorRepository,
);
container.registerSingleton<IPatientRepository>(
	'PatientRepository',
	PatientRepository,
);
