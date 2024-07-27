import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import {
	CreateOrUpdateUserParams,
	IUserRepository,
} from '../../interfaces/repositories/IUserRepository';
import { IUser } from '../../../infra/entities/IUserEntity';

type UserUpdateParams = {
	id: string;
	params: Partial<CreateOrUpdateUserParams>;
};

@injectable()
export default class UserUpdateUseCase
	implements IBaseUseCase<UserUpdateParams, IUser>
{
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute({ id, params }: UserUpdateParams): Promise<IUser> {
		const user = await this.userRepository.update(id, params);
		return user;
	}
}
