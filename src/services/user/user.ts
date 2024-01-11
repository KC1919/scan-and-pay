import { Prisma } from '@prisma/client';
import Database from '../../loaders/database';
import { userCreatePrisma } from '../../types/user/user';

export class UserService {
    static async create(name: string, phone: number) {
        try {
            const document: userCreatePrisma = {
                name,
                phone,
            };
            const result = Database.instance.user.create({ data: document });
        } catch (error) {
            console.log('Failed to create user:', error);
        }
    }

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
}
