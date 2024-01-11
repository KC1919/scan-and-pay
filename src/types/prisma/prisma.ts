import { PrismaClient } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import Database from "../../loaders/database";

export type IPrismaTransaction =
    | typeof PrismaClient
    | Omit<
        PrismaClient<PrismaClientOptions, never, DefaultArgs>,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >;
export interface IPrismaOptions {
    transaction?: typeof Database.instance;
}