import joi from "joi";
import chalk from "chalk";

import db from "../db.js";
import dayjs from "dayjs";

export async function postTransactions(req,res){
  const { description, amount, type } = req.body;
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    res.sendStatus(401);
    return
  }

  const schema = joi.object({
    description: joi.string().required(),
    amount: joi.number().required(),
    type: joi.string().valid("income", "expense").required()
  });

  const { error, value } = schema.validate({
    description,
    amount,
    type
  }, { abortEarly: false});

  if(error){
    res.status(422).send(error.details.map(e => e.message));
    return
  }

  try {
    const user = await db.collection("session").findOne({token});
    await db.collection("transactions").insertOne({description, amount, type, userId: user.userId, date: dayjs().format("DD/MM")});

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}

export async function getTransactions(req,res){
  const {authorization} = req.headers;

  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    res.sendStatus(401);
    return
  }

  try {
    const user = await db.collection("session").findOne({token});
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