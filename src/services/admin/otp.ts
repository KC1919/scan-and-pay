import Database from '../../loaders/database';
import generateOTP from '../../utils/generateOTP';
import { UserService } from '../user/user';

export class OtpService {
    // verifying user otp service
    static async verifyOtp(otp: number, table_number: number) {
        try {
            // fetching the otp saved in the database
            const result = await Database.instance.table.findFirst({
                where: {
                    tableNumber: table_number,
                },
                select: {
                    otp: true,
                },
            });

            // it not otp is there for the table, then return error
            if (!result) {
                throw new Error(
                    `Otp not found for table number: ${table_number}`
                );
            }

            // compare otp provided by the user with the otp saved in the database
            if (result.otp === otp) {
                console.log('Otp verified!');

                // generate JWT token
                // const token = await jwt.sign({ phone });

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
