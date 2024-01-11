import Database from "../../loaders/database"
import { IitemCreatePrisma, IitemPrisma } from "../../types/order/orderType";
import { ProductService } from "../product/product";

export class OrderService {

    // table number & item_lists (product_id(string) & qty (int))
    static async create(table_number: number, item_list: IitemPrisma[]) {
        try {
            const document: IitemCreatePrisma[] = [];

            item_list.forEach(async (item) => {

                // check if product exits by product_id
                if (!(await ProductService.getProductById(item.productId))) {
                    throw new Error('ResourceNotFound: product')
                }

                // document.push(item);
                // check if product exists
                const item_created = await Database.instance.item.create({
                    data: item
                });

                document.push(item_created)
            });

            const result = await Database.instance.order.create({
                data: document
            });
            return result;
        } catch (error) {
            console.log('error in creating table:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getAll() {
        try {
            const result = await Database.instance.table.findFirst({
            });
            return result;
        } catch (error) {
            console.log('error in getting all tables:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async updateOtp(table_number: number, otp: string) {
        const table = await Database.instance.table.findFirst({
            where: {
                table_number
            }
        });
        if (!table) {
            throw new Error('ResourceNotFound: Table');
        }

        if (table.otp) {
            throw new Error('OTP exists');
        }

        await Database.instance.table.update({
            where: {
                id: table.id
            },
            data: {
                otp: {
                    set: otp
                }
            }
        });

        return true;
    }

}
