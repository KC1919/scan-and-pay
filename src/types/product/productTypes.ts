import { Prisma, Product } from "@prisma/client";

export type IProductPrisma = Product;
export type IProductCreatePrisma = Prisma.ProductUncheckedCreateInput;

export type IProductUpdatePrisma = Prisma.ProductUncheckedUpdateInput;