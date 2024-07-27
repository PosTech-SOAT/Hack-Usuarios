import { inject, injectable } from 'tsyringe';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';

@injectable()
export default class UserDeleteUseCase implements IBaseUseCase<string, void> {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(id: string): Promise<void> {
		return this.userRepository.delete(id);
	}
}
