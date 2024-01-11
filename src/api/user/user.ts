import express from 'express';
import UserController from '../../controllers/user/user';
import 


const UserRouter=express.Router();

UserRouter
    .post('/create',UserController.create)
    .post('/verify-otp', )