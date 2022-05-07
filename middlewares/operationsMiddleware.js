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
    res.locals.user = user
    next();

  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}