import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IDoctor } from '../../../infra/entities/IDoctor';
import { IDoctorRepository } from '../../interfaces/repositories/IDoctorRepository';

@injectable()
export default class DoctorFindOneUseCase
	implements IBaseUseCase<string, IDoctor | null>
{
	constructor(
		@inject('DoctorRepository')
		private doctorRepository: IDoctorRepository,
	) {}

	async execute(id: string): Promise<IDoctor | null> {
		const doctor = await this.doctorRepository.findById(id);

		if (!doctor) {
			return null;
		}

		const doctorData = {
			id: doctor.id,
			user: doctor.user,
			crm: doctor.crm,
			name: doctor.name,
			specialty: doctor.specialty,
			rating: doctor.rating,
			available_hours: doctor.available_hours,
			latitude: doctor.latitude,
			longitude: doctor.longitude,
		};

		return doctorData;
	}
}
