import express from 'express';
import { StudentController } from './user.controller';

const router = express.Router();

router.post('/users', StudentController.createUser);
router.get('/users', StudentController.getAllUsers);

export const UserRoutes = router;
