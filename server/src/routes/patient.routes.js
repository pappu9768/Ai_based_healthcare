import express from 'express';
import { deleteAllChats, diagnosePatient, getConversation } from '../controllers/diagnose.controller.js';
import { createAppointment, getAllAppointmnet, updateStatus } from '../controllers/appointment.controller.js';
import {upsertDoctorInfo, getDoctorForPatient } from '../controllers/user.controller.js';
import { tokenCheck } from '../middleware/tokenCheck.js';
const patientRouter = express.Router();


patientRouter.post('/diagnose', tokenCheck,diagnosePatient);
patientRouter.get('/history',tokenCheck,getConversation);
patientRouter.delete('/history',tokenCheck,deleteAllChats);
patientRouter.post('/:id/appointment',tokenCheck,createAppointment);
patientRouter.get('/all',tokenCheck,getAllAppointmnet);

patientRouter.post('/doctorInfo',tokenCheck,upsertDoctorInfo)
patientRouter.get('/getdoctorinfo',tokenCheck,getDoctorForPatient)
patientRouter.patch('/status',tokenCheck,updateStatus)

export default patientRouter