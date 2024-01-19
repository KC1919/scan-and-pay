import { Prisma, User } from "@prisma/client";

export type userPrisma = User;
export type userCreatePrisma = Prisma.UserUncheckedCreateInput;