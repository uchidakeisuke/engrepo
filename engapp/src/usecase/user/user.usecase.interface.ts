import { IUser, ICreateUserCommand } from '@src/domain/index';

export default interface IUserUsecase {
  createUser(createUserCommand: ICreateUserCommand): Promise<IUser>;
}
