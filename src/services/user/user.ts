import { PrismaClient } from '@prisma/client';
import Database from '../../loaders/database';
import { userCreatePrisma } from '../../types/user/user';
import { OtpService } from '../admin/otp';
const prisma = new PrismaClient();

export class UserService {
    static async create(name: string, phone: number, table_number: number) {
        try {
            const document: userCreatePrisma = {
                name,
                phone
            };

            let user;

            // creating prisma transaction, for creating user and updating the table with otp
            await prisma.$transaction(async (tx) => {
                // MUKKU

                // check if otp for the table exist
                const tableResult = await tx.table.findFirst({
                    where: {
                        tableNumber: table_number,
                    },
                    select: {
                        otp: true,
                    },
                });

                if (!tableResult) {
                    throw new Error('Table does not exist');
                }

                // if otp for the table does not exist
                if (!tableResult.otp) {
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

                    // if otp failed to generate
                    if (!otp) {
                        throw new Error('Otp undefined');
                    }

                    // update otp in the table and connect created user to the table
                    await tx.table.update({
                        where: {
                            tableNumber: table_number,
                        },
                        data: {
                            otp: otp,
                        },
                    });

                    user = firstUser;
                } else {
                    // if a new user is trying to order from an existing table
                    // create a new user for the existing table

                    let friendUser = await tx.user.create({
                        data: document,
                    });

                    // if user not created throw error
                    if (!friendUser) {
                        throw new Error('Friend user cannot be created!');
                    }

                    user = friendUser;
                }
            });

            return user;
        } catch (error) {
            console.log('Failed to create user:', error);
        }
    }

    static async addVerifiedUser(user_id: string, table_number: number) {
        try {
            // verified means, verifying a user
            const user = await Database.instance.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    verified: true,
                },
                select: {
                    name: true,
                    phone: true,
                    verified: true,
                },
            });

            // if user created then connect the user to the table
            await Database.instance.table.update({
                where: {
                    tableNumber: table_number,
                },
                data: {
                    user: {
                        connect: { id: user_id },
                    },
                },
            });

            return user;
        } catch (error) {
            console.log('Failed to connect user to table, server error', error);
        }
    }

    static async getTable(table_number: number) {
        try {
            // check if OTP exists for a table
            const table = await Database.instance.table.findFirst({
                where: {
                    tableNumber: table_number,
                },
                select: {
                    otp: true,
                },
            });

            console.log(table);

            // if OTP for a table already exists
            if (table?.otp) {
                // render the OTP verification page
            } else {
                // send user login page, with embedded table number
            }
        } catch (error) {
            console.log(
                'Failed to render user login page, server error',
                error
            );
        }
    }
}
