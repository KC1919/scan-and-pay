import { Item, Order, Prisma } from "@prisma/client";

export type IorderPrisma = Order;
export type IitemPrisma = Item;

export type IorderCreatePrisma = Prisma.OrderUncheckedCreateInput;
export type IitemCreatePrisma = Prisma.ItemUncheckedCreateInput;

