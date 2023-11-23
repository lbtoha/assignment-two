import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './user/user.interface';

export const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const ordersSchema = new Schema<Orders>([
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
]);

// user schema
const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: Boolean,
  hobbies: [String, String],
  address: addressSchema,
  orders: ordersSchema,
});

// user model
const User = model<User>('User', userSchema);
