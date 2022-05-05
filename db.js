import chalk from "chalk";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log(chalk.bold.green("Conexão com o banco de dados estabelecida"))

} catch (error) {
  console.log(chalk.bold.red('Não foi possível estabelecer a conexão com o servidor'), error)

}

export default db;