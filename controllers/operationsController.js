import chalk from "chalk";
import { ObjectId } from "mongodb";

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
  const {userTransactions} = res.locals;

  try {
    
    userTransactions.map((transaction) => {
      delete transaction.userId
    })

    res.status(200).send(userTransactions);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }

}

export async function deleteTransaction(req,res){
  const {id} = req.params;

  console.log("Sou do delete", req.params)
  
  if(!id){
    res.sendStatus(404);
    return
  }
  
  try {
    const chosenTransaction = await db.collection('transactions').findOne({_id: ObjectId(id)});

    if(!chosenTransaction){
      res.sendStatus(404);
      return
    }

    await db.collection('transactions').deleteOne({_id: ObjectId(id)});
    res.sendStatus(200);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}

export async function updateTransaction(req,res){
  const {id} = req.params;

  try {
    await db.collection("transactions").updateOne({_id: ObjectId(id)}, {$set: req.body});
    res.sendStatus(200);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }

}