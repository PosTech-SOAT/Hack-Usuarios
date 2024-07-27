import 'reflect-metadata';
import {
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Patient {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => User, (user) => user.patient)
	@JoinColumn()
	user: User;

	@Column({ unique: true })
	cpf: string;

	@Column()
	name: string;

	@Column({ type: 'varchar', nullable: true })
	email: string;
}
