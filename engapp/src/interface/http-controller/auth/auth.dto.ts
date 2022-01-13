import { IUser } from '@src/domain/index';

export class SignupDto {
	username: IUser['username'];
	email: IUser['email'];
	firstName: IUser['firstName'];
	lastName: IUser['lastName'];
	password: IUser['password'];
}

export class SigninDto {
	username: IUser['username'];
	password: IUser['password'];
}

export class IsEmailAvailableDto {
	email: IUser['email'];
}

export class IsUsernameAvailableDto {
	username: IUser['username'];
}
