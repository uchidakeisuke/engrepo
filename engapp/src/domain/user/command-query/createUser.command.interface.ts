import IUser from '../user.interface';

export default interface ICreateUserCommand {
	username: IUser['username'];
	email: IUser['email'];
	firstName: IUser['firstName'];
	lastName: IUser['lastName'];
	password: IUser['password'];
}
