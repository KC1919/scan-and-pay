import Database from '../../loaders/database';
import generateOTP from '../../utils/generateOTP';

export class OtpService {
    static async verifyOtp(otp: number, table_number: number) {
        try {
            const result = await Database.instance.table.findFirst({
                where: {
                    table_number: table_number,
                },
                select: {
                    otp: true,
                },
            });

            if (result?.otp === otp) {
                console.log('Otp verified!');
                return true;
            }
            return false;
        } catch (error) {
            console.log('Failed to verify otp, server error!', error);
        }
    }

    static async generateOtp() {
        try {
            const otp = await generateOTP();
            return otp;
        } catch (error) {
            console.log(
                'Failed to generate otp, internal server error!',
                error
            );
        }
    }
}
