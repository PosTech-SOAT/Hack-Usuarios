import { IUser } from './IUserEntity';

export interface IPatient {
	id: string;
	user: IUser;
	cpf: string;
	name: string;
	email?: string;
	latitude?: number;
	longitude?: number;
}
