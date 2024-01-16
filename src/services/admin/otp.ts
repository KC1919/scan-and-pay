import Database from '../../loaders/database';
import generateOTP from '../../utils/generateOTP';

export class OtpService {
    // verifying user otp service
    static async verifyOtp(
        otp: number | string,
        table_number: number | string
    ) {
        try {
            otp = Number(otp);
            table_number = Number(table_number);
            // fetching the otp saved in the database
            const result = await Database.instance.table.findFirst({
                where: {
                    tableNumber: table_number,
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
