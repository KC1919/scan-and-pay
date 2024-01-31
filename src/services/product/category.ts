import Database from "../../loaders/database";
import { IPrismaOptions } from "../../types/prisma/prisma";
import { ICategoryCreatePrisma, ICategoryPrisma } from "../../types/product/categoryTypes";
// import { ProductService } from "./product";
// import { IProductPrisma } from "../../types/product/productTypes";

export class CategoryService {
    // table number & item_lists (product_id(string) & qty (int))

    static async create(
        data: ICategoryCreatePrisma,
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;

            if (!data || !data.name) {
                throw new Error('DataFormatWrong');
            }
            // deconstruct values from data
            const {
                name,
            } = data;
            const document: ICategoryCreatePrisma = {
                name
            };

            const result = await db.category.create({
                data: document
            });

            return result;
        } catch (error) {
            console.error('Error in creating Category:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getProductsByCategoryIdOrName(id: string) {
        try {
            if (!id) {
                throw new Error("SomethingWentWrong");
            }
            const result = await Database.instance.category.findMany({
                where: {
                    OR: [
                        {
                            id
                        },
                        {
                            name: id
                        }
                    ]
                },
                select: {
                    id: true,
                    products: true
                }
            });
            console.log('Products of category:');
            return result;
        } catch (error) {
            console.log('Error in getProductsByCategoryIdOrName: ', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async getAll(
        options?: IPrismaOptions
    ) {
        try {
            const db = options?.transaction || Database.instance;
            const result: ICategoryPrisma[] = await db.category.findMany({
                where: {
                    OR: [
                        { deletedAt: null },
                        { deletedAt: { isSet: false } }
                    ]
                }
            });

            // change filter
            return result;
        } catch (error) {
            console.log('error in getting all categories', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async delete(
        id: string,
        all: boolean,
        options?: IPrismaOptions
    ) {
        try {
            const db = Database.instance || options?.transaction;

            const category = await db.category.findFirst({
                where: {
                    id
                },
                include: {
                    products: true
                }
            });

            if (!category || category.deletedAt) {
                throw new Error('ResourceNotFound: Category');
            }

            const products = category.products;


            if (all) {
                db.$transaction(async (t) => {
                    await t.category.delete({
                        where: {
                            id
                        },
                    });
                    // hard delete the products
                    if (products) {
                        for (let i = 0; i < products.length; i++) {
                            const product = products[i];
                            if (!product) {
                                throw new Error('NOt able to traverse products');
                            }
                            // eslint-disable-next-line no-await-in-loop
                            await t.product.delete({
                                where: {
                                    id: product.id
                                },
                            });
                        }
                    }
                });

            }
            // soft delete
            else {
                db.$transaction(async (t) => {
                    await t.category.update({
                        where: {
                            id
                        },
                        data: {
                            deletedAt: new Date()
                        }
                    });
                    // hard delete the products
                    if (products) {
                        for (let i = 0; i < products.length; i++) {
                            const product = products[i];
                            if (!product) {
                                throw new Error('NOt able to traverse products');
                            }
                            // eslint-disable-next-line no-await-in-loop
                            await t.product.update({
                                where: {
                                    id: product.id
                                },
                                data: {
                                    deletedAt: new Date()
                                }
                            });
                        }
                    }
                });
            }
            return true;
        } catch (error) {
            console.log('Error:', error);
            return false;
        }

    }

}
