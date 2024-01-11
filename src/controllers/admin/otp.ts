import express from 'express';
import { OtpService } from '../../services/admin/otp';

class OtpController {
    verifyOtp = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const { otp, table_number } = request.body;
        const result = await OtpService.verifyOtp(otp, table_number);
        if (result === true) {
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
