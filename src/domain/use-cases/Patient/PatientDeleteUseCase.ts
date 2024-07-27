import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IPatientRepository } from '../../interfaces/repositories/IPatientRespository';

@injectable()
export default class PatientDeleteUseCase
	implements IBaseUseCase<string, void>
{
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
	) {}

	async execute(id: string): Promise<void> {
		return this.patientRepository.delete(id);
	}
}
