import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../config';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from './user/user.interface';

export const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const ordersSchema = new Schema<TOrders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
]);

// user schema
const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: { type: [ordersSchema], required: false },
});

// password hashing middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  if (doc) {
    doc.password = '';
  }
  next();
});

userSchema.post('findOneAndUpdate', function (doc, next) {
  if (doc) {
    doc.password = undefined;
  }
  next();
});

userSchema.post('findOne', function (doc, next) {
  if (doc) {
    doc.password = undefined;
  }
  next();
});

userSchema.post('find', function (users, next) {
  for (const user of users) {
    user.password = undefined;
  }
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

// user model
export const User = model<TUser, UserModel>('User', userSchema);
