import {
	Controller,
	Request,
	Post,
	UseGuards,
	Get,
	Body,
} from '@nestjs/common';
import { AuthService } from '@src/usecase/auth/auth.service';
import { JwtAuthGuard } from '@src/usecase/auth/jwt-auth.guard';
import { LocalAuthGuard } from '@src/usecase/auth/local-auth.guard';
import {
	SigninDto,
	SignupDto,
	IsEmailAvailableDto,
	IsUsernameAvailableDto,
} from './auth.dto';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/auth/signup')
	async signup(@Body() signupDto: SignupDto) {
		return this.authService.signup(
			signupDto.firstName,
			signupDto.lastName,
			signupDto.email,
			signupDto.username,
			signupDto.password
		);
	}

	@UseGuards(LocalAuthGuard)
	@Post('/auth/signin')
	async signin(@Body() signinDto: SigninDto) {
		console.log('req', signinDto);
		return this.authService.signin(signinDto.username);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/auth/profile')
	getProfile(@Request() req) {
		console.log('profile', req);
		return req.user;
	}

	@Post('/auth/user/email/available')
	async isEmailAvailable(@Body() isEmailAvailableDto: IsEmailAvailableDto) {
		const result = await this.authService.isEmailAvailable(
			isEmailAvailableDto.email
		);
		return { result };
	}

	@Post('/auth/user/username/available')
	async isUsernameAvailable(
		@Body() isUsernameAvailableDto: IsUsernameAvailableDto
	) {
		const result = await this.authService.isUsernameAvailable(
			isUsernameAvailableDto.username
		);
		return { result };
	}
}
