import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IUser } from '../../../infra/entities/IUserEntity';
import {
	CreateOrUpdateUserParams,
	IUserRepository,
} from '../../interfaces/repositories/IUserRepository';

@injectable()
export default class UserCreateUseCase
	implements IBaseUseCase<CreateOrUpdateUserParams, IUser>
{
	constructor(
		@inject('UserRepository')
		private UserRepository: IUserRepository,
	) {}

	async execute(params: CreateOrUpdateUserParams): Promise<IUser> {
		const user = await this.UserRepository.create({
			email: params.email,
			password: params.password,
			role: params.role,
		});

		return user;
	}
}
