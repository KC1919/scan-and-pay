import Database from "../../loaders/database"

export class TableService {
    static async create(table_number: number) {
        try {
            const document = {
                table_number
            }
            console.log(document);
            const result = await Database.instance.table.create({
                data: {
                    table_number
                }
            });
            return result;
        } catch (error) {
            console.log('error in creating table:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getAll() {
        try {
            const result = await Database.instance.table.findMany({});
            return result;
        } catch (error) {
            console.log('error in getting all tables:', error);
            throw new Error('SomethingWentWrong');
        }
    }

}