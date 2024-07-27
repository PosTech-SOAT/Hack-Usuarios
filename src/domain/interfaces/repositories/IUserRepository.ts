import { IUser, UserRole } from '../../../infra/entities/IUserEntity';

export type CreateOrUpdateUserParams = {
	email: string;
	password?: string;
	role: UserRole;
};

export interface IUserRepository {
	create(params: CreateOrUpdateUserParams): Promise<IUser>;
	findById(id: string): Promise<IUser | null>;
	list(): Promise<Array<IUser>>;
	update(id: string, params: Partial<CreateOrUpdateUserParams>): Promise<any>;
	delete(id: string): Promise<any>;
}
