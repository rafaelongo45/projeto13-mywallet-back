import joi from "joi";
import chalk from "chalk";

import db from "../db.js";

export async function transactions(req,res){
  const { description, amount, type } = req.body;
  const { authorization } = req.headers;
  console.log(authorization)

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
    console.log(token);
    console.log(user)
    await db.collection("transactions").insertOne({description, amount, type, userId: user._id});

    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}