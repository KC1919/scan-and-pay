import { PrismaClient } from '@prisma/client';
import Database from '../../loaders/database';
import { tableCreatePrisma } from '../../types/admin/table';
const prisma = new PrismaClient();

export class TableService {
    // creating table
    static async create(table_number: number, qrcode: string) {
        try {
            const document: tableCreatePrisma = {
                tableNumber: table_number,
                qrcode,
            };
            const result = await Database.instance.table.create({
                data: document,
            });
            return result;
        } catch (error) {
            console.log('error in creating table:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    // fetching all tables
    static async getAll() {
        try {
            const result = await Database.instance.table.findFirst({});
            return result;
        } catch (error) {
            console.log('error in getting all tables:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getTableByNumber(table_number: number) {
        try {
            const table = await Database.instance.table.findFirst({
                where: {
                    tableNumber: table_number,
                },
            });

            if (!table) {
                throw new Error('Table does not exist');
            }
            return table;
        } catch (error) {
            console.log('Failed to get table data, server error: ', error);
        }
    }

    // updating a table with the otp for the table_number
    static async updateOtp(otp: number, table_number: number) {
        try {
            const result = await Database.instance.table.update({
                where: {
                    tableNumber: table_number,
                },
                data: {
                    otp: otp,
                },
            });
            return result;
        } catch (error) {
            console.log('failed to update otp:', error);
        }
    }

    // delete otp service and disconnect users from that table
    // fetch table via table_number,
    static async resetTable(table_number: number) {
        try {
            // prisma transaction
            prisma.$transaction(async (tx) => {
                // fetch table and users if associated
                const table = await tx.table.findFirst({
                    where: {
                        tableNumber: table_number,
                    },
                    include: {
                        user: true,
                    },
                });

                // if no table found
                if (!table) {
                    throw new Error(
                        `No table found with table number: ${table_number}`
                    );
                }

                // if table does not have an OTP
                if (!table.otp) {
                    throw new Error('Table is empty');
                } else {
                    // extracting user ids of the user associated with the table
                    let userIds = table.user.map((user) => {
                        return user.id;
                    });

                    // making the OTP null for the table and disassociating users from the table

                    await tx.table.update({
                        where: {
                            tableNumber: table_number,
                        },
                        data: {
                            otp: null,
                            user: {
                                disconnect: userIds.map((id) => ({
                                    id,
                                })),
                            },
                        },
                    });
                }
            });
        } catch (error) {
            console.log('Failed to reset table, server error', error);
        }
    }
}

// export class TableService {
//     static async create(table_number: number) {

//     }
// }
