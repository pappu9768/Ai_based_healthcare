import express from 'express';
import { loginUserAuth, registerUserAuth } from '../middleware/userAuthentication.js';
import { register, login, checkToken } from '../controllers/user.controller.js';
import { tokenCheck } from '../middleware/tokenCheck.js';
const router = express.Router();

router.post('/register', registerUserAuth, register);
router.post('/login', loginUserAuth, login)


router.get('/check', tokenCheck, checkToken)
export default router;