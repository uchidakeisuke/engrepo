import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository, IUser } from '@src/domain/user/index';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@Inject('IUserRepository') private userRepository: IUserRepository,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userRepository.findOne(username);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async signin(username: IUser['username']) {
		const payload = { username: username };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}

	async signup(
		firstName: IUser['firstName'],
		lastName: IUser['lastName'],
		email: IUser['email'],
		username: IUser['username'],
		password: IUser['password']
	) {
		const user = await this.userRepository.create({
			firstName,
			lastName,
			email,
			username,
			password,
		});
		const payload = { username: user.username };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}

	async isEmailAvailable(email: IUser['email']) {
		const user = await this.userRepository.findOneByEmail(email);
		return user ? false : true;
	}

	async isUsernameAvailable(username: IUser['username']) {
		const user = await this.userRepository.findOne(username);
		return user ? false : true;
	}
}
