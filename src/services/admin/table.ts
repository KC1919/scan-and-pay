import Database from '../../loaders/database';
import { tableCreatePrisma } from '../../types/admin/table';

export class TableService {
    // creating table
    static async create(table_number: number, qrcode: string) {
        try {
            const document: tableCreatePrisma = {
                table_number,
                qrcode
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

    // updating a table with the otp for the table_number
    static async updateOtp(otp: number, table_number: number) {
        try {
            const result = 'write query here'; // write otp update query for a table=table_number
        } catch (error) {
            console.log('failed to update otp:', error);
        }
    }
}

// export class TableService {
//     static async create(table_number: number) {

//     }
// }
