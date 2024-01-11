import Database from '../../loaders/database';
import { tableCreatePrisma } from '../../types/admin/table';

export class TableService {
    static async create(table_number: number) {
        try {
            const document: tableCreatePrisma = {
                table_number,
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

    static async getAll() {
        try {
            const result = await Database.instance.table.findFirst({});
            return result;
        } catch (error) {
            console.log('error in getting all tables:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async update(data: { otp?: number; table_number?: number }) {
        try {
            let update_key: string;
            let update_value: string | number;

            if (data['otp']) {
                update_key = 'otp';
                update_value = data['otp'];
            } else if (data['table_number']) {
                update_key = 'table_number';
                update_value = data['table_number'];
            }

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
