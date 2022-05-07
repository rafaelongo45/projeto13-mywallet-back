import chalk from "chalk";

import db from "../db.js";
import dayjs from "dayjs";

export async function postTransactions(req,res){
  const { description, amount, type } = req.body;
  const {user} = res.locals;

  try {
    await db.collection("transactions").insertOne({description, amount, type, userId: user.userId, date: dayjs().format("DD/MM")});

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}

export async function getTransactions(req,res){
  const {user} = res.locals;

  try {
    const userTransactions = await db.collection("transactions").find({userId:user.userId}).toArray();
    
    userTransactions.map((transaction) => {
      delete transaction._id
      delete transaction.userId
    })

    res.status(200).send(userTransactions);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }

}