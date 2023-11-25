import z from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 characters' })
    .max(20, {
      message: 'First can not be more then 20 characters',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 characters' })
    .max(20, {
      message: 'Last can not be more then 20 characters',
    }),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// user schema
const userValidationSchema = z.object({
  userId: z.number().min(1),
  username: z
    .string()
    .min(1, { message: 'User name must be at least 1 characters' })
    .max(45, {
      message: 'User name can not be more then 20 characters',
    }),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

export default userValidationSchema;
