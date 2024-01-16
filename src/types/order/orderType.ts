import { Order, Prisma } from "@prisma/client";

export type IOrderPrisma = Order;

export type IOrderCreatePrisma = Prisma.OrderUncheckedCreateInput;

export type TItemFE = {
    productId: string,
    quantity: number,
}

export type TItemCreate = {
    productId: string,
    quantity: number,
    amount: number
}