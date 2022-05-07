import {v4} from "uuid";
import chalk from "chalk";
import bcrypt from "bcrypt";

import db from "../db.js";

export async function hasAccountCheck(req,res, next){
  const {email} = req.body;

  try {
    const user = await db.collection("users").findOne({email});

    if(user) {
      console.log(chalk.bold.red("Usuário já cadastrado"));
      res.sendStatus(409);
      return
    }

    next();

  }catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}

export async function validUserCheck(req,res, next){
  const {email, password} = req.body;

  try {
    const user = await db.collection('users').findOne({email});

    if(!(user && bcrypt.compareSync(password, user.password))){
      res.status(404).send("Usuário não encontrado!");
    }

    const token = v4();

    await db.collection("session").insertOne({userId: user._id, token});

    const data = {token, user: user.name}
    console.log(data)
    res.locals.data = data
  }catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }

  next();
}