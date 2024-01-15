import express from 'express';
import OtpController from '../../controllers/admin/otp';


const OtpRouter=express.Router();

OtpRouter
    .post('/verify-otp', OtpController.verifyOtp)