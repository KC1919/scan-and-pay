import express from 'express';
import AuthController from '../../controllers/admin/auth';

const AuthRouter = express.Router();

AuthRouter
    .post('/register', AuthController.register)
    .post('/login',AuthController.login)

export default AuthRouter;
