import { Repository } from 'typeorm';
import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import { User } from '../entities/User';
import {
	CreateOrUpdateUserParams,
	IUserRepository,
} from '../interfaces/repositories/IUserRepository';
import { IUser } from '../../infra/entities/IUserEntity';

export class UserRepository implements IUserRepository {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<User> {
		return this.connection.getConnection().getRepository(User);
	}

	async create(params: CreateOrUpdateUserParams): Promise<IUser> {
		try {
			const connection = this.getRepo();
			const user = connection.create(params);

			return connection.save(user);
		} catch (error) {
			console.error('Erro ao criar User', error);
			throw error;
		}
	}

	async list(): Promise<User[]> {
		try {
			const repo = this.getRepo();

			const users = await repo.find();

			return users;
		} catch (error) {
			console.error('Erro ao listar Users', error);
			throw error;
		}
	}

	async findById(id: string): Promise<User | null> {
		const connection = this.getRepo();

		return connection
			.createQueryBuilder('find_by_id')
			.where('id = :id', { id })
			.getOne();
	}

	async update(id: string, data: Partial<User>): Promise<User | null> {
		const connection = this.getRepo();

		await connection
			.createQueryBuilder('user')
			.update(User)
			.set(data)
			.where('id = :id', { id })
			.execute();

		return connection.findOne({ where: { id } });
	}

	async delete(id: string) {
		const connection = this.getRepo();
		await connection
			.createQueryBuilder('delete_user')
			.delete()
			.from(User)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
}
