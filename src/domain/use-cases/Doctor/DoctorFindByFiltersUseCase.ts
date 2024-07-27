import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import {
	DoctorFilterParams,
	IDoctorRepository,
} from '../../interfaces/repositories/IDoctorRepository';
import { IDoctor } from '../../../infra/entities/IDoctor';

@injectable()
export default class DoctorFilterUseCase
	implements IBaseUseCase<DoctorFilterParams, IDoctor[]>
{
	constructor(
		@inject('DoctorRepository')
		private doctorRepository: IDoctorRepository,
	) {}

	async execute(filters: DoctorFilterParams): Promise<IDoctor[]> {
		const doctors = await this.doctorRepository.findByFilters(filters);
		return doctors;
	}
}
