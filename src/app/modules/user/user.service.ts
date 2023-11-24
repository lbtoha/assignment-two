import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();

  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
};
