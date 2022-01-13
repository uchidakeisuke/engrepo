import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../interface/http-controller/auth/auth.controller';
import { AuthService } from '../usecase/auth/auth.service';
import { LocalStrategy } from '../usecase/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../constants/auth';
import { JwtStrategy } from '@src/usecase/auth/jwt.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: secret,
			signOptions: { expiresIn: 3600 },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [JwtModule],
})
export class AuthModule {}
