import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PatientCreateUseCase from '../../domain/use-cases/Patient/PatientCreateUseCase';
import PatientListUseCase from '../../domain/use-cases/Patient/PatientListUseCase';
import PatientFindOneUseCase from '../../domain/use-cases/Patient/PatientFindOneUseCase';
import PatientUpdateUseCase from '../../domain/use-cases/Patient/PatientUpdateUseCase';
import PatientDeleteUseCase from '../../domain/use-cases/Patient/PatientDeleteUseCase';

export default class PatientController {
	async create(request: Request, response: Response): Promise<Response> {
		const { user, cpf, name, email, latitude, longitude } = request.body;

		if (
			!user ||
			!cpf ||
			!name ||
			latitude === undefined ||
			longitude === undefined
		) {
			return response.status(400).json({ message: 'Missing required data' });
		}

		const createPatientUseCase = container.resolve(PatientCreateUseCase);

		try {
			await createPatientUseCase.execute({
				user,
				cpf,
				name,
				email,
				latitude,
				longitude,
			});

			return response
				.status(201)
				.json({ message: 'Patient created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const patientListUseCase = container.resolve(PatientListUseCase);

		try {
			const patients = await patientListUseCase.execute();

			return response.status(200).json(patients);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {
		const patientListUseCase = container.resolve(PatientFindOneUseCase);

		try {
			const patient = await patientListUseCase.execute(request.params.cpf);

			return response.status(200).json(patient);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async update(request: Request, response: Response) {
		const patientListUseCase = container.resolve(PatientUpdateUseCase);

		try {
			await patientListUseCase.execute({
				id: request.params.cpf,
				params: request.body,
			});
			return response
				.status(200)
				.json({ message: 'Patient updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {
		const deletePatientUseCase = container.resolve(PatientDeleteUseCase);
		try {
			await deletePatientUseCase.execute(request.params.id);

			return response
				.status(200)
				.json({ message: 'Patient deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
