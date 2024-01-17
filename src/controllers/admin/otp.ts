import express from 'express';
import { OtpService } from '../../services/admin/otp';
import jwt from 'jsonwebtoken';

class OtpController {
    static verifyOtp = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const { otp, table_number } = request.body;
        const result = await OtpService.verifyOtp(
            Number(otp),
            Number(table_number)
        );
        
        // if OTP is verified successfully
        if (result === true) {
            // redirect the user to the menu page
            return response.status(200).json({
                status: true,
                message: 'Otp verified successfully',
            });
        } else {
            return response.status(400).json({
                status: false,
                message: 'Failed to verify otp, please enter a valid otp!',
            });
        }
    };
}

export default OtpController;
