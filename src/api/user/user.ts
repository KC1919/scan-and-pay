import express from 'express';
import UserController from '../../controllers/user/user';


const UserRouter=express.Router();

UserRouter
    .post('/create',UserController.create)