import express from 'express';
import { getOtherUsers, login, logout, register } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', verifyToken, getOtherUsers); 
router.get('/logout', logout);

export default router;
