import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import IUserUsecase from '@src/usecase/user/user.usecase.interface';
import { IUser } from '@src/domain';

@Controller('user')
export default class UserController {
	@Inject('IUserUsecase') private userUsecase: IUserUsecase;

	@Get('/create')
	async createUser(): Promise<string> {
		return 'hello world';
	}

	@Post('/create')
	async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
		console.log('controller body', createUserDto);
		const user = await this.userUsecase.createUser(createUserDto);
		return user;
	}
}
