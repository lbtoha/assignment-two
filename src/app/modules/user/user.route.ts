import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getSingleUser);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);
router.put('/users/:userId/orders', UserController.addProduct);
router.get('/users/:userId/orders', UserController.getOrders);
router.get(
  '/users/:userId/orders/total-price',
  UserController.calculateTotalPrice,
);

export const UserRoutes = router;
