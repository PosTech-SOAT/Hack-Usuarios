import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { IUser } from '../../../infra/entities/IUserEntity';

@injectable()
export default class UserFindOneUseCase
	implements IBaseUseCase<string, IUser | null>
{
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(id: string): Promise<IUser | null> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			return null;
		}

		const userData = {
			id: user.id,
			email: user.email,
			role: user.role,
		};

		return userData;
	}
}
