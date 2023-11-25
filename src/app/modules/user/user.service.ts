import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserInDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error(`User is already exists in the database`);
  }

  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = await User.findOne({ userId: userId });
  if (await !User.isUserExists(userId)) {
    throw new Error('User not found!');
  }
  return user;
};

const updateUserInDB = async (userId: number, updatedData: TUser) => {
  if (await !User.isUserExists(userId)) {
    throw new Error('User not found!');
  }
  const user = await User.findOneAndUpdate({ userId: userId }, updatedData);
  return user;
};

const deleteUserFromDB = async (userId: number) => {
  if (await !User.isUserExists(userId)) {
    throw new Error('User not found!');
  }
  const user = await User.deleteOne({ userId: userId });
  return user;
};

const addNewProductInDB = async (userId: number, productData: TUser) => {
  if (await !User.isUserExists(userId)) {
    throw new Error('User not found!');
  }

  const update = {
    $push: { orders: productData },
  };

  const result = await User.findOneAndUpdate({ userId: userId }, update, {
    new: true,
  });

  return result;
};

const getAllOrdersFromDB = async (userId: number) => {
  const user = await User.findOne({ userId: userId });
  if (await !User.isUserExists(userId)) {
    throw new Error('User not found!');
  }
  return user?.orders;
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addNewProductInDB,
  getAllOrdersFromDB,
};
