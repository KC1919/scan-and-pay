import Database from "../../loaders/database"
import { IItemPrisma } from "../../types/order/orderType";
import { IPrismaOptions } from "../../types/prisma/prisma";
import { TableService } from "../admin/table";
import { ProductService } from "../product/product";

export class OrderService {

    // table number & item_lists (product_id(string) & qty (int))
    static async create(
        table_number: number,
        item_list: IItemPrisma[],
        options?: IPrismaOptions) {
        try {
            const db = options?.transaction || Database.instance;

            // check if product exits by product_id
            item_list.forEach(async (item) => {
                if (!(await ProductService.getProductById(item.productId))) {
                    throw new Error('ResourceNotFound: product')
                }
                // await Database.instance.item.create({
                //     data: item
                // });
                // document.item_list.push(item_created)
            });

            const table = await TableService.getTableByNumber(table_number);

            if (!table) {
                throw new Error("ResourceNotFound: Table");
            }

            const result = await db.order.create({
                data: {
                    tableNumber: table.table_number,
                    item_list: {
                        createMany: {
                            data: item_list
                        }
                    }
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
