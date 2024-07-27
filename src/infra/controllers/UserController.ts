import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserCreateUseCase from '../../domain/use-cases/User/UserCreateUseCase';
import UserDeleteUseCase from '../../domain/use-cases/User/UserDeleteUseCase';
import UserFindOneUseCase from '../../domain/use-cases/User/UserFindOneUseCase';
import UserListUseCase from '../../domain/use-cases/User/UserListUseCase';
import { IUser } from '../entities/IUserEntity';
import UserUpdateUseCase from '../../domain/use-cases/User/UserUpdateUseCase';
import { CreateOrUpdateUserParams } from '../../domain/interfaces/repositories/IUserRepository';

export default class UserController {
	async create(request: Request, response: Response) {
		if (!request.body.email && !request.body.role && !request.body.role) {
			return response.status(400).json({ message: 'Missing required data' });
		}
		const createUserUseCase = container.resolve(UserCreateUseCase);
		try {
			await createUserUseCase.execute(request.body);

			return response
				.status(201)
				.json({ message: 'User created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response): Promise<Response> {
		const listUsersUseCase = container.resolve(UserListUseCase);
		try {
			const users = await listUsersUseCase.execute();

			const usersWithoutPassword = users.map(
				(user: Omit<IUser, 'password'>) => ({
					id: user.id,
					email: user.email,
					role: user.role,
				}),
			);

			return response.status(200).json(usersWithoutPassword);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {
		const findOneUserUseCase = container.resolve(UserFindOneUseCase);
		try {
			const user = await findOneUserUseCase.execute(request.params.id);

			return response.status(200).json(user);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async update(request: Request, response: Response): Promise<Response> {
		const userUpdateUseCase = container.resolve(UserUpdateUseCase);
		try {
			const user = await userUpdateUseCase.execute({
				id: request.params.id,
				params: request.params as Partial<CreateOrUpdateUserParams>,
			});

			const { password, ...userWithoutPassword } = user;

			return response.status(200).json({
				message: 'User updated successfully',
				user: userWithoutPassword,
			});
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {
		const deleteUserUseCase = container.resolve(UserDeleteUseCase);
		try {
			await deleteUserUseCase.execute(request.params.id);

			return response
				.status(200)
				.json({ message: 'User deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
