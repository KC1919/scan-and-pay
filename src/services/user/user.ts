import { Prisma } from '@prisma/client';
import Database from '../../loaders/database';
import { userCreatePrisma } from '../../types/user/user';
import { OtpService } from '../admin/otp';
import { TableService } from '../admin/table';

export class UserService {
    static async create(name: string, phone: number, table_number: number) {
        try {
            const document: userCreatePrisma = {
                name,
                phone,
            };
            const userResult = Database.instance.user.create({
                data: document,
            });

            const otp = await OtpService.generateOtp();

            const otpResult = await TableService.updateOtp(otp, table_number);

            return userResult;
        } catch (error) {
            console.log('Failed to create user:', error);
        }
    }
}
