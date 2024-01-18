import { PrismaClient } from '@prisma/client';
import Database from '../../loaders/database';
import { IPrismaOptions } from '../../types/prisma/prisma';
import { tableCreatePrisma } from '../../types/admin/tableType';
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

    // to get all tables for ADMIN FE
    // Table number:1,  OTP,  PAYMENT? 
    static async getAll(
        page?: number,
        limit?: number,
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;

            const totalTables = await db.table.count({});
            const currentPage = page ?? 1;
            const itemsPerPage = limit ?? 10;
            const pages = Math.ceil(totalTables / itemsPerPage);

            const result = await Database.instance.table.findMany({
                select: {
                    tableNumber: true,
                    otp: true
                },
                take: itemsPerPage,
                skip: (currentPage - 1) * itemsPerPage,
            });

            const filter_count = result ? result.length : 0;

            // change filter
            return {
                meta: {
                    total_count: totalTables,
                    filter_count: filter_count,
                    pages: pages
                },
                result
            };
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
                    otp,
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
            await prisma.$transaction(async (tx) => {
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
                    const userIds = table.user.map((user) => {
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
            return true;
        } catch (error) {
            console.log('Failed to reset table, server error', error);
        }
    }
}

