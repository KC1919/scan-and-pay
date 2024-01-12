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
            });

            // get table id by table_number
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

    // to get all order
    static async getAll(
        page?: number,
        limit?: number,
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;

            const totalOrders = await db.order.count({});
            const currentPage = page ?? 1;
            const itemsPerPage = limit ?? 10;
            const pages = Math.ceil(totalOrders / itemsPerPage);

            const result = await Database.instance.order.findMany({
                take: itemsPerPage,
                skip: (currentPage - 1) * itemsPerPage,
            });

            const filter_count = result ? result.length : 0;

            // change filter
            return {
                meta: {
                    total_count: totalOrders,
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

    // to fetch all orders & items in each by table number
    static async getByTableNumber(tableNumber: number, options?: IPrismaOptions) {
        try {
            const db = options?.transaction || Database.instance;
            const orders = await db.order.findMany({
                where: {
                    tableNumber
                },
                include: {
                    item_list: true
                }
            });

            if (!orders) {
                throw new Error('ResourceNotFound: Order');
            }

            return orders;
        } catch (error) {
            console.log('Error in fetching order by table number');
            throw new Error('SomethingWentWrong');
        }
    }



}
