import { PrismaClient } from "@prisma/client";
import Database from "../../loaders/database"
import { TItemCreate, TItemFE } from "../../types/order/orderType";
import { IPrismaOptions, PrismaOrder } from "../../types/prisma/prisma";
import { TableService } from "../admin/table";
import { ProductService } from "../product/product";

export class OrderService {

    // Create an empty Order
    // A table will have only 1 order
    static async create(
        table_number: number,
        options?: IPrismaOptions) {
        try {
            const db = options?.transaction || Database.instance;

            // No need to verify Table exists or not, because this function will only be called when we initialize table with empty order

            // Check: if table exists
            // const table = await TableService.getTableByNumber(table_number);

            // if (!table) {
            //     throw new Error("ResourceNotFound: Table");
            // }

            const result = await db.order.create({
                data: {
                    table: {
                        connect: {
                            tableNumber: table_number
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

    static async addItems(
        id: string,
        table_number: number,
        item_list: TItemFE[],
        options?: IPrismaOptions) {
        try {
            let db;
            if (options?.transaction) {
                db = options.transaction
            } else {
                db = Database.instance as PrismaClient;
            }

            // 2nd Loop through items using transaction follow below properties

            const items: TItemCreate[] = [];
            // check if product exits by product_id
            item_list.forEach(async (item) => {
                const product = await ProductService.getProductById(item.productId);

                // a. Check if product exists
                if (!product || !product.quantity) {
                    throw new Error('ResourceNotFound: product')
                }

                // b. Check if qty ordered <= product qty
                if (item.quantity > product.quantity) {
                    throw new Error('UnderFlow: Products');
                }

                // c. Decrease qty of product
                const updated_quantity = product.quantity - item.quantity;

                await ProductService.update(
                    product.id,
                    { quantity: updated_quantity }
                );

                // d. calculate amount and add to items

                const amount = product.sellingPrice * item.quantity;
                const document: TItemCreate = {
                    productId: product.id,
                    quantity: item.quantity,
                    amount
                };

                items.push(document);
            });

            // get table id by table_number
            const table = await TableService.getTableByNumber(table_number);

            if (!table) {
                throw new Error("ResourceNotFound: Table");
            }

            const result = await db.order.create({
                data: {
                    tableNumber: table.tableNumber,
                    items
                }
            });
            return result;
        } catch (error) {
            console.log('error in creating table:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    // FE req: send current date in startDate and endDate: tmrw
    // to get all order, by default on current date
    static async getAll(
        filter?: string,
        page?: number,
        limit?: number,
        orderBy?: string,
        search?: string,
        startDate?: string,
        endDate?: string,
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;
            console.log("Query in get all orders:", orderBy);

            // initialize all values
            const currentPage = page ?? 1;
            const searchFilter = search ?? '';
            const itemsPerPage = limit ?? 10;
            const orderByColumn: string = orderBy ?? '-created_at';
            const paymentFilter = filter ?? 'pending';
            const dateStart = startDate ? new Date(startDate).toISOString() : (new Date());
            const dateEnd = endDate ? new Date(endDate).toISOString() : new Date();

            // get all pending/filtered orders and by date
            const totalOrders = await db.order.count({
                where: {
                    status: paymentFilter,
                    createdAt: {
                        gte: dateStart,
                        lte: dateEnd
                    }
                },
            });

            const pages = Math.ceil(totalOrders / itemsPerPage);

            const cleanorderByColumn: string = orderByColumn.startsWith('-')
                ? orderByColumn.substring(1)
                : orderByColumn;
            const sortOrder = orderByColumn.startsWith('-')
                ? PrismaOrder.desc
                : PrismaOrder.asc;

            // Filtering, pagination
            const result = await db.order.findMany({
                where: {
                    status: searchFilter
                },
                orderBy: {
                    [cleanorderByColumn]: sortOrder
                },
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
    // query
    static async getByTableNumber(tableNumber: number, options?: IPrismaOptions) {
        try {
            const db = options?.transaction || Database.instance;
            const orders = await db.order.findMany({
                where: {
                    tableNumber
                },
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
