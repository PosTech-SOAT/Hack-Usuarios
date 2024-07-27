import { Repository } from 'typeorm';

import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import {
	CreateOrUpdatePatientParams,
	IPatientRepository,
} from '../interfaces/repositories/IPatientRespository';
import { IPatient } from '../../infra/entities/IPatient';
import { Patient } from '../entities/Patient';

export class PatientRepository implements IPatientRepository {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Patient> {
		return this.connection.getConnection().getRepository(Patient);
	}

	async create(params: CreateOrUpdatePatientParams): Promise<IPatient> {
		try {
			const connection = this.getRepo();
			const patient = connection.create(params);

			return connection.save(patient);
		} catch (error) {
			console.error('Erro ao criar Paciente', error);
			throw error;
		}
	}

	async list(): Promise<IPatient[]> {
		try {
			const repo = this.getRepo();

			const patients = await repo.find();

			return patients;
		} catch (error) {
			console.error('Erro ao listar Pacientes', error);
			throw error;
		}
	}

	async findById(id: string): Promise<IPatient | null> {
		try {
			const connection = this.getRepo();

			return connection
				.createQueryBuilder('find_by_id')
				.where('id = :id', { id })
				.getOne();
		} catch (error) {
			console.error('Erro ao buscar Paciente por ID', error);
			throw error;
		}
	}

	async findByCpf(cpf: string): Promise<IPatient | null> {
		try {
			const repo = this.getRepo();

			const patient = await repo.findOne({ where: { cpf } });

			return patient || null;
		} catch (error) {
			console.error('Erro ao buscar Paciente por CPF:', error);
			throw error;
		}
	}

	async update(
		id: string,
		params: Partial<CreateOrUpdatePatientParams>,
	): Promise<IPatient> {
		const connection = this.getRepo();
		try {
			await connection
				.createQueryBuilder()
				.update(Patient)
				.set(params)
				.where('id = :id', { id })
				.execute();

			const updatedPatient = await connection.findOne({ where: { id } });
			if (!updatedPatient) {
				throw new Error('Patient not found');
			}
			return updatedPatient as IPatient;
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<void> {
		const connection = this.getRepo();
		await connection
			.createQueryBuilder('delete_Patient')
			.delete()
			.from(Patient)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
}
