import { IUser } from './IUserEntity';

export interface IPatient {
	user: IUser;
	cpf: string;
	name: string;
	email?: string;
	latitude?: number;
	longitude?: number;
}
