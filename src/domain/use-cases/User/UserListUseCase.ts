import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IUser } from '../../../infra/entities/IUserEntity';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';

@injectable()
export default class UserListUseCase
	implements IBaseUseCase<undefined, Array<IUser>>
{
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(): Promise<Array<IUser>> {
		return (await this.userRepository.list()).map((user) => ({
			id: user.id,
			email: user.email,
			role: user.role,
		}));
	}
}
