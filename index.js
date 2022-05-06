import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import { signUp, logIn } from "./controllers/userController.js";
import { postTransactions, getTransactions } from "./controllers/operationsController.js";

import db from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.post("/signup", signUp);

app.post("/login", logIn);

app.post("/transactions", postTransactions);

app.get("/transactions", getTransactions)

app.listen(process.env.PORT, () => { console.log(chalk.bold.green("Servidor rodando"))})