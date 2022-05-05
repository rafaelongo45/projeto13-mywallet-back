import joi from "joi"
import chalk from "chalk";
import bcrypt from "bcrypt";

import db from "../db.js";

export async function signUp(req, res){
  const {name, email, password} = req.body;

  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.any().required()
  });

  const { error, value } = schema.validate({name, email, password}, {abortEarly: false})

  if(error){
    res.status(422).send(error.details.map(e => e.message));
    return 
  }

  try {
    const hasAccount = await db.collection("users").findOne({email});

    if(hasAccount) {
      console.log(chalk.bold.red("Usuário já cadastrado"));
      res.sendStatus(409);
      return
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    await db.collection("users").insertOne({name, email, password: passwordHash})
    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}
