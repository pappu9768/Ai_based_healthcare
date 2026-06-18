import express from 'express';

import { register, login, checkToken} from '../controllers/user.controller.js';
import { tokenCheck } from '../middleware/tokenCheck.js';
;
const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get('/check', tokenCheck, checkToken);



export default router;