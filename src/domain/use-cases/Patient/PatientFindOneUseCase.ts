import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IPatient } from '../../../infra/entities/IPatient';
import { IPatientRepository } from '../../interfaces/repositories/IPatientRespository';

@injectable()
export default class PatientFindOneUseCase
	implements IBaseUseCase<string, IPatient | null>
{
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository
	) {}

	async execute(id: string): Promise<IPatient | null> {
		const patient = await this.patientRepository.findById(id);

		if (!patient) {
			return null;
		}

		const patientData: IPatient = {
			id: patient.id,
			user: patient.user,
			cpf: patient.cpf,
			name: patient.name,
			email: patient.email,
			latitude: patient.latitude,
			longitude: patient.longitude,
		};

		return patientData;
	}
}
