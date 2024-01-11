import Database from '../../loaders/database';
import generateOTP from '../../utils/generateOTP';

export class OtpService {
    // verifying user otp service
    static async verifyOtp(otp: number, table_number: number) {
        try {
            // fetching the otp saved in the database
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
                // delete otp from the database after verification 
                // await Database.instance.table.update({
                //     where: {
                //         table_number: table_number,
                //     },
                //     data: {
                //         otp: null,
                //     },
                // });
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
