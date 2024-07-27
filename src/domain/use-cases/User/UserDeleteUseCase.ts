import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IUser } from '../../../infra/entities/IUserEntity';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';

@injectable()
export default class UserDeleteUseCase implements IBaseUseCase<string, any> {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(id: string): Promise<IUser> {
		return this.userRepository.delete(id);
	}
}
