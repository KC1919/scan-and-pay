import { Category, Prisma } from "@prisma/client";

export type ICategoryPrisma = Category;
export type ICategoryCreatePrisma = Prisma.CategoryUncheckedCreateInput;
