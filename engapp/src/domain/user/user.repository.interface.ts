import { IUser } from '.';
import ICreateUserCommand from './command-query/createUser.command.interface';

export default interface IUserRepository {
	create(createUserCommand: ICreateUserCommand): Promise<IUser>;
	findOne(username: IUser['username']): Promise<IUser>;
	findOneByEmail(email: IUser['email']): Promise<IUser>;
}
