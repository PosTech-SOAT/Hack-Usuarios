import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Doctor } from '../../../domain/entities/Doctor';
import { Patient } from '../../../domain/entities/Patient';
import { User } from '../../../domain/entities/User';

const port = parseInt(String(process.env.DB_PORT));

export class PostgreSQLFactory {
	private data: DataSource;

	constructor() {
		this.data = new DataSource({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: port,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [User, Doctor, Patient],
			migrations: ['./src/data/typeorm/migrations/*.ts'],
			migrationsTableName: 'Migrations',
			synchronize: false,
			logging: true,
		});
	}

	get dataSource() {
		return this.data;
	}

	async create(): Promise<DataSource> {
		await this.data.initialize();
		return this.data;
	}
}
