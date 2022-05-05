import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import { signUp } from "./controllers/userController.js";

import db from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.post("/users", signUp);

app.listen(process.env.PORT, () => { console.log(chalk.bold.green("Servidor rodando"))})