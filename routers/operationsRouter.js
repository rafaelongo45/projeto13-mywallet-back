import express from "express";

import { tokenValidation } from "../middlewares/operationsMiddleware.js";
import { postTransactionSchema } from "../middlewares/schemas/postTransactionSchema.js";
import { postTransactions, getTransactions, deleteTransaction, updateTransaction } from "../controllers/operationsController.js";

const transactionsRouter = express.Router();

transactionsRouter.post("/transactions", postTransactionSchema, tokenValidation, postTransactions);
transactionsRouter.get("/transactions", tokenValidation, getTransactions);
transactionsRouter.delete("/transactions/:id", tokenValidation, deleteTransaction);
transactionsRouter.put("/transactions/:id", postTransactionSchema, tokenValidation, updateTransaction);


export default transactionsRouter;