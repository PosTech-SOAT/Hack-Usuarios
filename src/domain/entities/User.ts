// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Doctor } from './Doctor';
import { Patient } from './Patient';
import { UserRole } from '../../infra/entities/IUserEntity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
	})
	role: UserRole;

	@OneToOne(() => Doctor, (doctor) => doctor.user)
	doctor: Doctor;

	@OneToOne(() => Patient, (patient) => patient.user)
	patient: Patient;
}
