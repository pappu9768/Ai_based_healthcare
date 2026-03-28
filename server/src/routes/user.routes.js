import express from 'express';

import { register, login, checkToken, upsertDoctorInfo, getDoctorForPatient } from '../controllers/user.controller.js';
import { tokenCheck } from '../middleware/tokenCheck.js';
import { deleteAllChats, diagnosePatient, getConversation } from '../controllers/diagnose.controller.js';
import { createAppointment, getAllAppointmnet } from '../controllers/appointment.controller.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get('/check', tokenCheck, checkToken);
router.post('/diagnose', tokenCheck,diagnosePatient);
router.get('/history',tokenCheck,getConversation);
router.delete('/history',tokenCheck,deleteAllChats);
router.post('/:id/appointment',tokenCheck,createAppointment);
router.get('/all',tokenCheck,getAllAppointmnet);

router.post('/doctorInfo',tokenCheck,upsertDoctorInfo)
router.get('/getdoctorinfo',tokenCheck,getDoctorForPatient)


export default router;