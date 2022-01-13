import { Inject } from '@nestjs/common';
import { IUser, IUserRepository, ICreateUserCommand } from '@src/domain';
import IUserUsecase from './user.usecase.interface';

export default class UserUsecase implements IUserUsecase {
	@Inject('IUserRepository') private userRepository: IUserRepository;

	async createUser(createUserCommand: ICreateUserCommand): Promise<IUser> {
		const user = await this.userRepository.create(createUserCommand);
		return user;
	}
}
