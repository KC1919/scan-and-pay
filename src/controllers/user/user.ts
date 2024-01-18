import express from 'express';
import { UserService } from '../../services/user/user';
import { OtpService } from '../../services/admin/otp';

class UserController {
    static create = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const { name, phone, table_number } = request.body;
        const result = await UserService.create(
            name,
            Number(phone),
            Number(table_number)
        );
        console.log('User created successfully!');
        return response.status(200).json({
            status: true,
            content: {
                data: result,
            },
        });
    };

    static getTable = async (
        request: express.Request,
        response: express.Response
    ) => {
        const { table_number } = request.params;
        const result = await UserService.getTable(Number(table_number));
    };

    static verifyOtp = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const { user_id, otp, table_number } = request.body;
        const result = await OtpService.verifyOtp(
            Number(otp),
            Number(table_number)
        );

        // if OTP is verified successfully
        if (result === true) {
            const result = await UserService.addVerifiedUser(
                user_id,
                Number(table_number)
            );

            if (result) {
                // redirect the user to the menu page
                return response.status(200).json({
                    status: true,
                    message: 'Otp verified successfully',
                    content: {
                        data: result,
                    },
                });
            }
        } else {
            return response.status(400).json({
                status: false,
                message: 'Failed to verify otp, please enter a valid otp!',
            });
        }
    };
}

export default UserController;
