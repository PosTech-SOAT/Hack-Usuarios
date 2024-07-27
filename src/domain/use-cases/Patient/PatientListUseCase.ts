import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IPatient } from '../../../infra/entities/IPatient';
import { IPatientRepository } from '../../interfaces/repositories/IPatientRespository';

@injectable()
export default class PatientListUseCase
	implements IBaseUseCase<void, IPatient[]>
{
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository
	) {}

	async execute(): Promise<IPatient[]> {
		const patients = await this.patientRepository.list();

		const patientsList = patients.map((patient) => ({
			id: patient.id,
			user: patient.user,
			cpf: patient.cpf,
			name: patient.name,
			email: patient.email,
			latitude: patient.latitude,
			longitude: patient.longitude,
		}));

		return patientsList;
	}
}
