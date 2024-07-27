import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IDoctor } from '../../../infra/entities/IDoctor';
import { IDoctorRepository } from '../../interfaces/repositories/IDoctorRepository';

@injectable()
export default class DoctorListUseCase
	implements IBaseUseCase<void, Array<IDoctor>>
{
	constructor(
		@inject('DoctorRepository')
		private doctorRepository: IDoctorRepository,
	) {}

	async execute(): Promise<Array<IDoctor>> {
		return (await this.doctorRepository.list()).map((doctor) => ({
			id: doctor.id,
			user: doctor.user,
			crm: doctor.crm,
			name: doctor.name,
			specialty: doctor.specialty,
			rating: doctor.rating,
			available_hours: doctor.available_hours,
			latitude: doctor.latitude,
			longitude: doctor.longitude,
		}));
	}
}
