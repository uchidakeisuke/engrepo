import IUser from './user.interface';

export default class User implements IUser {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	password: string;
}
