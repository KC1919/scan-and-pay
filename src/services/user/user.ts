import { PrismaClient } from '@prisma/client';
import Database from '../../loaders/database';
import { userCreatePrisma } from '../../types/user/user';
import { OtpService } from '../admin/otp';
import { TableService } from '../admin/table';
const prisma = new PrismaClient();

export class UserService {
    static async create(name: string, phone: number, table_number: number) {
        try {
            const document: userCreatePrisma = {
                name,
                phone,
                tableNumber: table_number,
            };

            let user;

            // creating prisma transaction, for creating user and updating the table with otp
            await prisma.$transaction(async (tx) => {
                // MUKKU
                const tableResult = await tx.table.findFirst({
                    where: {
                        tableNumber: table_number,
                    },
                    select: {
                        otp: true,
                    },
                });

                if (!tableResult) {
                    // if this is the first user for the table then generate otp and save it
                    let firstUser = await tx.user.create({
                        data: document,
                    });

                    // if user not created throw error
                    if (!firstUser) {
                        throw new Error('Failed to create user!');
                    }

                    // generate otp
                    const otp = await OtpService.generateOtp();

                    if (!otp) {
                        throw new Error('Otp undefined');
                    }

                    // await TableService.updateOtp(otp, table_number);

                    // update otp in the table and connect created user to the table
                    await tx.table.update({
                        where: {
                            tableNumber: table_number,
                        },
                        data: {
                            otp: otp,
                            user: {
                                connect: {
                                    id: firstUser.id,
                                },
                            },
                        },
                    });

                    user = firstUser;
                } else {

                    // if a new user is tring to order from an existing table
                    // create a new user for the existing table

                    let friendUser = await tx.user.create({
                        data: document,
                    });

                    // if user not created throw error
                    if (!friendUser) {
                        throw new Error('Friend user cannot be created!');
                    }

                    // if user created then connect the user to the table
                    await tx.table.update({
                        where: {
                            tableNumber: table_number,
                        },
                        data: {
                            user: {
                                connect: { id: friendUser.id },
                            },
                        },
                    });

                    user = friendUser;
                }
            });

            return user;
        } catch (error) {
            console.log('Failed to create user:', error);
        }
    }
}
