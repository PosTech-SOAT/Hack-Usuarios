import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { User } from './User';
import { AvailableHours, Specialty } from '../../infra/entities/IDoctor';

@Entity()
export class Doctor {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => User, (user) => user.doctor)
	@JoinColumn()
	user: User;

	@Column({ unique: true })
	crm: string;

	@Column()
	name: string;

	@Column({
		type: 'enum',
		enum: Specialty,
		nullable: true,
	})
	specialty?: Specialty;

	@Column({ type: 'float', nullable: true })
	rating?: number;

	@Column({ type: 'json', nullable: true })
	available_hours?: AvailableHours;

	@Column({ type: 'float' })
	latitude: number;

	@Column({ type: 'float' })
	longitude: number;
}
