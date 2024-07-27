import { IPatient } from '../../../infra/entities/IPatient';
import { IUser } from '../../../infra/entities/IUserEntity';

export type CreateOrUpdatePatientParams = {
	user: IUser;
	cpf: string;
	name: string;
	email: string;
	latitude: number;
	longitude: number;
};

export interface IPatientRepository {
	create(params: CreateOrUpdatePatientParams): Promise<IPatient>;
	findById(id: string): Promise<IPatient | null>;
	findByCpf(cpf: string): Promise<IPatient | null>;
	list(): Promise<IPatient[]>;
	update(
		id: string,
		params: Partial<CreateOrUpdatePatientParams>,
	): Promise<IPatient>;
	delete(id: string): Promise<void>;
}
