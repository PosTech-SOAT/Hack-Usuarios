import { inject, injectable } from 'tsyringe';
import {
	CreateOrUpdateDoctorParams,
	IDoctorRepository,
} from '../../interfaces/repositories/IDoctorRepository';
import { IDoctor } from '../../../infra/entities/IDoctor';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

export type DoctorUpdateParams = {
	id: string;
	params: Partial<CreateOrUpdateDoctorParams>;
};

@injectable()
export default class DoctorUpdateUseCase
	implements IBaseUseCase<DoctorUpdateParams, IDoctor>
{
	constructor(
		@inject('DoctorRepository')
		private doctorRepository: IDoctorRepository
	) {}

	async execute({ id, params }: DoctorUpdateParams): Promise<IDoctor> {
		const doctorExists = await this.doctorRepository.findById(id);

		if (!doctorExists) {
			throw new Error('Doctor not found');
		}
		const doctor = await this.doctorRepository.update(id, params);
		return doctor;
	}
}
