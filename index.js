import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";

import userRouter from "./routers/authRouter.js";
import transactionsRouter from "./routers/operationsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const router = express.Router();

app.use(router);

router.use(userRouter);
router.use(transactionsRouter);


app.listen(process.env.PORT, () => { console.log(chalk.bold.green("Servidor rodando"))})