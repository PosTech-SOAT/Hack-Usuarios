import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DoctorCreateUseCase from '../../domain/use-cases/Doctor/DoctorCreateUseCase';
import DoctorDeleteUseCase from '../../domain/use-cases/Doctor/DoctorDeleteUseCase';
import DoctorFindOneUseCase from '../../domain/use-cases/Doctor/DoctorFindOneUseCase';
import DoctorListUseCase from '../../domain/use-cases/Doctor/DoctorListUseCase';
import DoctorUpdateUseCase from '../../domain/use-cases/Doctor/DoctorUpdateUseCase';
import DoctorFindByFiltersUseCase from '../../domain/use-cases/Doctor/DoctorFindByFiltersUseCase';
import { DoctorFilterParams } from '../../domain/interfaces/repositories/IDoctorRepository';

export default class DoctorController {
	async create(request: Request, response: Response) {
		const doctor = request.body;
		if (!doctor) {
			return response.status(400).json({ message: 'Missing required data' });
		}
		const createDoctorUseCase = container.resolve(DoctorCreateUseCase);
		try {
			await createDoctorUseCase.execute(doctor);

			return response
				.status(201)
				.json({ message: 'Doctor created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const listDoctorsUseCase = container.resolve(DoctorListUseCase);
		try {
			const doctors = await listDoctorsUseCase.execute();

			return response.status(200).json(doctors);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {
		const findOneDoctorUseCase = container.resolve(DoctorFindOneUseCase);
		try {
			const category = await findOneDoctorUseCase.execute(request.params.id);

			return response.status(200).json(category);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findByFilters(request: Request, response: Response): Promise<Response> {
		const doctorFilterUseCase = container.resolve(DoctorFindByFiltersUseCase);

		const { specialty, distance, rating, latitude, longitude } = request.query;

		const filters: DoctorFilterParams = {
			specialty: specialty as string,
			distance: distance ? Number(distance) : undefined,
			rating: rating ? Number(rating) : undefined,
			latitude: latitude ? Number(latitude) : undefined,
			longitude: longitude ? Number(longitude) : undefined,
		};

		try {
			const doctors = await doctorFilterUseCase.execute(filters);
			return response.status(200).json(doctors);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {
		const deleteDoctorUseCase = container.resolve(DoctorDeleteUseCase);
		try {
			await deleteDoctorUseCase.execute(request.params.id);

			return response
				.status(204)
				.json({ message: 'Doctor deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async update(request: Request, response: Response) {
		const updateDoctorUseCase = container.resolve(DoctorUpdateUseCase);
		try {
			await updateDoctorUseCase.execute({
				id: request.params.id,
				params: request.body,
			});

			return response
				.status(200)
				.json({ message: 'Doctor updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
