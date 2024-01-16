import Database from "../../loaders/database";
import { IPrismaOptions } from "../../types/prisma/prisma";
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
                categoryId
            } = data;
            const document: IProductCreatePrisma = {
                name,
                quantity,
                costPrice,
                sellingPrice,
                categoryId  // Optional field
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
            const result = await Database.instance.product.findUnique({
                where: {
                    id
                }
            });
            return result;
        } catch (error) {
            console.log('Error in getById in Product:', error);
            throw new Error('SomethingWentWrong');
        }
    }

    static async update(
        id: string,
        data: IProductUpdatePrisma,
        options?: IPrismaOptions
    ) {
        const db = options?.transaction || Database.instance;
        const product = await db.product.findUnique({
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
        } = data;

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

        await db.product.update({
            where: {
                id
            },
            data: document
        });

        return true;
    }

}
