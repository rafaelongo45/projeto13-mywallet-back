import chalk from "chalk";

import db from "../db.js";

export async function tokenValidation(req,res,next){
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    res.sendStatus(401);
    return
  }

  try {
    const user = await db.collection("session").findOne({token});
    console.log(user)
    const userTransactions = await db.collection("transactions").find({userId:user.userId}).toArray();

    res.locals.user = user
    res.locals.userTransactions = userTransactions;
    next();

  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}