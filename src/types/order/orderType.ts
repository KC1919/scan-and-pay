import { Item, Order, Prisma } from "@prisma/client";

export type IOrderPrisma = Order;
export type IItemPrisma = Item;

export type IOrderCreatePrisma = Prisma.OrderUncheckedCreateInput;
export type IItemCreatePrisma = Prisma.ItemUncheckedCreateInput;

