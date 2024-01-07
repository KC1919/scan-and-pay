import { PrismaClient } from "@prisma/client";

class Database {
  static instance: PrismaClient;

  static async Loader() {
    try {
      const client = new PrismaClient();
      await client.$connect();
      console.log(
        `✅ Prisma: Connected to mongodb Database on port.`
      );
      Database.instance = client;

      // creates all the table if it doesn't exist
      // await database.sync({ alter: true });
    } catch (ex) {
      console.log(ex);
    }
  }

  // static async Close(): Promise<void> {
  //   try {
  //     await database.close();
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }
}
export default Database;
