import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import {
	CreateOrUpdatePatientParams,
	IPatientRepository,
} from '../../interfaces/repositories/IPatientRespository';
import { IPatient } from '../../../infra/entities/IPatient';

export type PatientUpdateParams = {
	id: string;
	params: Partial<CreateOrUpdatePatientParams>;
};

@injectable()
export default class PatientUpdateUseCase
	implements IBaseUseCase<PatientUpdateParams, any>
{
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
	) {}

	async execute({ id, params }: PatientUpdateParams): Promise<IPatient> {
		const patient = await this.patientRepository.update(id, params);
		if (!patient) {
			throw new Error('Patient not found');
		}
		return patient;
	}
}
