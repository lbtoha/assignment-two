import express from 'express';
import { StudentController } from './user.controller';

const router = express.Router();

router.post('/users', StudentController.createUser);
router.get('/users', StudentController.getAllUsers);
router.get('/users/:userId', StudentController.getSingleUser);

export const UserRoutes = router;
