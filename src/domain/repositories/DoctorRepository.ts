import { Repository } from 'typeorm';
import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import {
	CreateOrUpdateDoctorParams,
	DoctorFilterParams,
	IDoctorRepository,
} from '../interfaces/repositories/IDoctorRepository';
import { IDoctor } from '../../infra/entities/IDoctor';
import { Doctor } from '../entities/Doctor';
import { getDistanceFromLatLonInKm } from '../../presentation/utils/distanceCalculator';

export class DoctorRepository implements IDoctorRepository {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Doctor> {
		return this.connection.getConnection().getRepository(Doctor);
	}

	async create(params: CreateOrUpdateDoctorParams): Promise<IDoctor> {
		try {
			const connection = this.getRepo();
			const doctor = connection.create(params);

			return connection.save(doctor);
		} catch (error) {
			console.error('Erro ao criar Médico', error);
			throw error;
		}
	}

	async findById(id: string): Promise<IDoctor | null> {
		try {
			const connection = this.getRepo();

			return connection
				.createQueryBuilder('find_by_id')
				.where('id = :id', { id })
				.getOne();
		} catch (error) {
			console.error('Erro ao buscar Médico por ID', error);
			throw error;
		}
	}

	async findByCpf(cpf: string): Promise<IDoctor | null> {
		try {
			const connection = this.getRepo();

			return connection
				.createQueryBuilder('find_by_cpf')
				.where('cpf = :cpf', { cpf })
				.getOne();
		} catch (error) {
			console.error('Erro ao buscar Paciente por CPF', error);
			throw error;
		}
	}

	async findByFilters(filters: DoctorFilterParams): Promise<Doctor[]> {
		const connection = this.getRepo();

		const queryBuilder = connection.createQueryBuilder('doctor');

		if (filters.specialty) {
			queryBuilder.andWhere('doctor.specialty = :specialty', {
				specialty: filters.specialty,
			});
		}

		if (filters.rating !== undefined) {
			queryBuilder.andWhere('doctor.rating >= :rating', {
				rating: filters.rating,
			});
		}

		let doctors = await queryBuilder.getMany();

		if (
			filters.distance !== undefined &&
			filters.latitude !== undefined &&
			filters.longitude !== undefined
		) {
			const { latitude, longitude, distance } = filters;
			doctors = doctors.filter((doctor) => {
				if (doctor.latitude !== undefined && doctor.longitude !== undefined) {
					const calculatedDistance = getDistanceFromLatLonInKm(
						latitude,
						longitude,
						doctor.latitude,
						doctor.longitude
					);
					return calculatedDistance <= distance;
				}
				return false;
			});
		}

		return doctors;
	}

	async list(): Promise<IDoctor[]> {
		try {
			const repo = this.getRepo();

			const doctors = await repo.find();

			return doctors;
		} catch (error) {
			console.error('Erro ao listar Médicos', error);
			throw error;
		}
	}

	async update(id: string, params: CreateOrUpdateDoctorParams): Promise<void> {
		const connection = this.getRepo();
		try {
			await connection
				.createQueryBuilder('find_by_doctor_id')
				.update()
				.where('id = :id', { id })
				.set(params)
				.execute();

			return Promise.resolve();
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<any> {
		const connection = this.getRepo();
		await connection
			.createQueryBuilder('delete_doctor')
			.delete()
			.from(Doctor)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
}
