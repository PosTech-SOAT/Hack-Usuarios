import { IDoctor, Specialty } from '../../../infra/entities/IDoctor';
import { IUser } from '../../../infra/entities/IUserEntity';

export type CreateOrUpdateDoctorParams = {
	user: IUser;
	crm: string;
	name: string;
	specialty?: Specialty;
	rating?: number;
	available_hours?: any;
	latitude?: number;
	longitude?: number;
};

export interface DoctorFilterParams {
	specialty?: string;
	distance?: number;
	rating?: number;
	latitude?: number;
	longitude?: number;
}

export interface IDoctorRepository {
	create(params: CreateOrUpdateDoctorParams): Promise<IDoctor>;
	findById(id: string): Promise<IDoctor | null>;
	findByFilters(filters: DoctorFilterParams): Promise<IDoctor[]>;
	list(): Promise<IDoctor[]>;
	update(id: string, params: Partial<CreateOrUpdateDoctorParams>): Promise<any>;
	delete(id: string): Promise<void>;
}
