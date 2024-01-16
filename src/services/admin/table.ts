import Database from '../../loaders/database';
import { tableCreatePrisma } from '../../types/admin/table';

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
}

// export class TableService {
//     static async create(table_number: number) {

//     }
// }
