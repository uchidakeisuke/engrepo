import { Module } from '@nestjs/common';
import { UserRepository } from '../infrastructure/datastore/prisma/index';
import UserUsecase from '../usecase/user/user.usecase';

@Module({
	imports: [],
	controllers: [],
	providers: [
		{ provide: 'IUserUsecase', useClass: UserUsecase },
		{ provide: 'IUserRepository', useClass: UserRepository },
	],
	exports: [
		{ provide: 'IUserUsecase', useClass: UserUsecase },
		{ provide: 'IUserRepository', useClass: UserRepository },
	],
})
export class UserModule {}
