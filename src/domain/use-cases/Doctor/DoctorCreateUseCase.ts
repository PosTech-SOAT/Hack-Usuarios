import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IDoctor } from '../../../infra/entities/IDoctor';
import {
	CreateOrUpdateDoctorParams,
	IDoctorRepository,
} from '../../interfaces/repositories/IDoctorRepository';

@injectable()
export default class DoctorCreateUseCase
	implements IBaseUseCase<CreateOrUpdateDoctorParams, IDoctor>
{
	constructor(
		@inject('DoctorRepository')
		private doctorRepository: IDoctorRepository,
	) {}

	async execute(params: CreateOrUpdateDoctorParams): Promise<IDoctor> {
		const doctor = await this.doctorRepository.create({
			user: params.user,
			crm: params.crm,
			name: params.name,
			specialty: params.specialty,
			rating: params.rating,
			available_hours: params.available_hours,
			latitude: params.latitude,
			longitude: params.longitude,
		});

		return doctor;
	}
}
