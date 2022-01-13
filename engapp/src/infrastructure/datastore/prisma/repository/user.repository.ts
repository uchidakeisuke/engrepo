import { IUser, IUserRepository, ICreateUserCommand } from '@src/domain/index';
import { PrismaClient } from '@prisma/client';
import { User, UserPassword } from 'prisma/prisma-client/index.d';

const toUserDto = (
	user: User & {
		UserPassword: UserPassword;
	}
): IUser => {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		createdAt: user.createdAt,
		password: user.UserPassword.password,
	};
};

export default class UserRepository implements IUserRepository {
	async findOneByEmail(email: IUser['email']): Promise<IUser> {
		const user = await this.prisma.user.findUnique({
			where: {
				email: email,
			},
			include: {
				UserPassword: true,
			},
		});

		if (!user) {
			return null;
		}

		return toUserDto(user);
	}
	prisma = new PrismaClient();

	async findOne(username: IUser['username']): Promise<IUser> {
		const user = await this.prisma.user.findUnique({
			where: {
				username: username,
			},
			include: {
				UserPassword: true,
			},
		});

		if (!user) {
			return null;
		}

		return toUserDto(user);
	}

	async create(createUserCommand: ICreateUserCommand): Promise<IUser> {
		const user = await this.prisma.user.create({
			data: {
				username: createUserCommand.username,
				email: createUserCommand.email,
				firstName: createUserCommand.firstName,
				lastName: createUserCommand.lastName,
				UserPassword: {
					create: {
						password: createUserCommand.password,
					},
				},
			},
			include: {
				UserPassword: true,
			},
		});

		return toUserDto(user);
	}
}
