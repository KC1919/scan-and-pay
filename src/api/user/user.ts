import express from 'express';
import UserController from '../../controllers/user/user';
import OtpController from '../../controllers/admin/otp';


const UserRouter=express.Router();

UserRouter
    .post('/create',UserController.create)
    .post('/verify-otp', OtpController.verifyOtp)