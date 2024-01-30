import Database from "../../loaders/database";
import { IPrismaOptions } from "../../types/prisma/prisma";
import { ICategoryCreatePrisma, ICategoryPrisma } from "../../types/product/categoryTypes";
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
            console.log("all categories:", result);

            // change filter
            return result;
        } catch (error) {
            console.log('error in getting all categories', error);
            throw new Error('SomethingWentWrong');
        }
    }

}
