import { IUser } from '@src/domain/index';

export class CreateUserDto {
	username: IUser['username'];
	email: IUser['email'];
	firstName: IUser['firstName'];
	lastName: IUser['lastName'];
	password: IUser['password'];
}
