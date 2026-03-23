import express from 'express';
import { loginUserAuth, registerUserAuth } from '../middleware/userAuthentication.js';
import { register, login, checkToken } from '../controllers/user.controller.js';
import { tokenCheck } from '../middleware/tokenCheck.js';
import { diagnosePatient } from '../controllers/diagnose.controller.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', loginUserAuth, login)


router.get('/check', tokenCheck, checkToken)
router.post('/diagnose', tokenCheck,diagnosePatient);

export default router;