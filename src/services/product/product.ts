import Database from "../../loaders/database";
import { IPrismaOptions, PrismaOrder } from "../../types/prisma/prisma";
import { IProductCreatePrisma, IProductPrisma, IProductUpdatePrisma } from "../../types/product/productTypes";

export class ProductService {
    // table number & item_lists (product_id(string) & qty (int))

    static async create(
        data: IProductPrisma,
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;

            // deconstruct values from data
            const {
                name,
                quantity,
                costPrice,
                sellingPrice,
                vegTag,
                categoryId = null
            } = data;
            const document: IProductCreatePrisma = {
                name,
                quantity,
                costPrice,
                sellingPrice,
                vegTag,
                deletedAt: null,
                categoryId
            };

            const result = await db.product.create({
                data: document
            });

            return result;
        } catch (error) {
            console.error('Error in creating product:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getProductById(id: string): Promise<IProductPrisma | null> {
        try {
            if (!id) {
                throw new Error("SomethingWentWrong");
            }
            const result = await Database.instance.product.findFirst({
                where: {
                    id
                },
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            return result;
        } catch (error) {
            console.log('Error in getById in Product:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getAll(
        filter?: string,
        filterColumn?: string,
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

            // initialize all values
            const currentPage = page ?? 1;
            const searchFilter = search ?? '';
            const itemsPerPage = limit ?? 10;

            // what kind of products are we picking, by default we are picking which aren't deleted, 
            // so column is deletedAt & value to search is null
            const countFilter = filter ?? null;
            const countColumn = filterColumn ?? 'deletedAt';
            const whereClause: any = {
                AND: [
                    { deletedAt: { isSet: false } },
                    { deletedAt: null },
                    {
                        [countColumn]: countFilter,
                        name: searchFilter
                    }
                ],
            }

            // order by means on what paramters to sort on, whether asc or desc
            const orderByColumn: string = orderBy ?? '-createdAt';
            const cleanorderByColumn: string = orderByColumn.startsWith('-')
                ? orderByColumn.substring(1)
                : orderByColumn;
            const sortOrder = orderByColumn.startsWith('-')
                ? PrismaOrder.desc
                : PrismaOrder.asc;


            const dateStart = startDate ? new Date(startDate).toISOString() : undefined;
            const dateEnd = endDate ? new Date(endDate).toISOString() : undefined;

            // modify where clause for dates
            if (dateStart) {
                whereClause.createdAt = {
                    ...(whereClause.createdAt || {}),
                    gte: dateStart,
                };
            }

            if (dateEnd) {
                whereClause.createdAt = {
                    ...(whereClause.createdAt || {}),
                    lte: dateEnd,
                };
            }

            console.log(
                "Current page: ", currentPage,
                "\n items per page: ", itemsPerPage,
                "\n searchFIlter: ", searchFilter,
                "\n coount filter; filter: ", filter,
                "\n count column: ", countColumn,
                "\n orderByColumn: ", orderByColumn,
                "\n start date: ", dateStart,
                "\n end date:", dateEnd,
                "\n where clause:", whereClause
            );


            // find all by default which werent deleted (so deletedAt doesnt have date)
            const totalProducts = await db.product.count({
                where: whereClause
            });
            console.log("totoal products:", totalProducts);
            const pages = Math.ceil(totalProducts / itemsPerPage);

            console.log(
                "Total pages;", pages,
                "\n clean orderby column", cleanorderByColumn,
                "\n sort order:", sortOrder);

            // Filtering, pagination
            const result = await db.product.findMany({
                where: whereClause,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
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
                    total_count: totalProducts,
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

    static async update(
        id: string,
        data: IProductUpdatePrisma,
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;
            const product = await db.product.findFirst({
                where: {
                    id
                }
            });
            if (!product) {
                throw new Error('ResourceNotFound: Product');
            }
            const {
                name,
                costPrice,
                sellingPrice,
                categoryId,
                quantity
            } = data || {};

            // document picks fields which are passed in data
            const document: IProductUpdatePrisma = {};

            if (typeof name !== 'undefined') {
                document.name = name;
            }

            if (typeof costPrice !== 'undefined') {
                document.costPrice = costPrice;
            }

            if (typeof sellingPrice !== 'undefined') {
                document.sellingPrice = sellingPrice;
            }

            if (typeof categoryId !== 'undefined') {
                document.categoryId = categoryId;
            }

            if (typeof quantity !== 'undefined') {
                document.quantity = quantity;
            }

            if (Object.keys(document).length === 0) {
                throw new Error('CustomMesage: Change value of atleast 1 fields');
            }


            const result = await db.product.update({
                where: {
                    id,
                    name: product.name
                },
                data: document
            });

            return result;
        } catch (error) {
            console.error('Error in updating product:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    // this adds category to product if not present
    static async updateCategory(
        id: string,
        category_id: string,
    ) {
        try {
            if (!id) {
                throw new Error('MissingProperty id:Product id');
            }
            const product = this.getProductById(id);
            if (!product) {
                throw new Error('ResourceNotFound: Product');
            }

            const result = await Database.instance.product.update({
                where: {
                    id
                },
                data: {
                    category: {
                        connect: {
                            id: category_id
                        }
                    }
                }
            });

            return result;
        } catch (error) {
            console.log('error in adding to category', error);
            throw new Error('SomethingWentWrong')
        }

    }

}
