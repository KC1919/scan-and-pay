import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
// import Database from "../../loaders/database";

const prisma = new PrismaClient();
export const PrismaNull = Prisma.AnyNull;
export const PrismaOrder = Prisma.SortOrder;
export type IPrismaTransaction =
    | typeof prisma
    | Omit<
        PrismaClient<PrismaClientOptions, never, DefaultArgs>,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >;

export type PrismaTransactionClient =
    PrismaClient |
    Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">;
export interface IPrismaOptions {
    transaction?: PrismaTransactionClient;
}
