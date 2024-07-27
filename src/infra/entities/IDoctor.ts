import { IUser } from './IUserEntity';

export enum Specialty {
	Cardiologia = 'Cardiologia',
	Dermatologia = 'Dermatologia',
	Pediatria = 'Pediatria',
}

export interface AvailableHour {
	day: string;
	start: string;
	end: string;
}

export type AvailableHours = AvailableHour[];

export interface IDoctor {
	id: string;
	user: IUser;
	crm: string;
	name: string;
	specialty?: Specialty;
	rating?: number;
	available_hours?: AvailableHours;
	latitude: number;
	longitude: number;
}
