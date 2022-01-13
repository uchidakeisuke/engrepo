import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { UserController } from '../interface/http-controller/index';

@Module({
	imports: [UserModule, AuthModule],
	controllers: [UserController],
	providers: [],
	exports: [],
})
export class AppModule {}
