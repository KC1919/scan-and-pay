import express from 'express';
import UserController from '../../controllers/user/user';
import OtpController from '../../controllers/admin/otp';

const UserRouter = express.Router();

UserRouter.get('/table/:table_number', UserController.getTable)
    .post('/create', UserController.create)
    .post('/verify-otp', UserController.verifyOtp);

export default UserRouter;
