import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IPatient } from '../../../infra/entities/IPatient';
import { CreateOrUpdatePatientParams, IPatientRepository } from '../../interfaces/repositories/IPatientRespository';

@injectable()
export default class PatientCreateUseCase
	implements IBaseUseCase<CreateOrUpdatePatientParams, IPatient>
{
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
	) {}

	async execute(params: CreateOrUpdatePatientParams): Promise<IPatient> {
		const existingPatient = await this.patientRepository.findByCpf(params.cpf);

		if (existingPatient) {
			throw new Error('CPF already exists in the database');
		}

		const patient = await this.patientRepository.create({
			user: params.user,
			cpf: params.cpf,
			name: params.name,
			email: params.email,
			latitude: params.latitude,
			longitude: params.longitude
		});

		return patient;
	}
}
