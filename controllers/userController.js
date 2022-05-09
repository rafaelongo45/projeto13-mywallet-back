import chalk from "chalk";
import bcrypt from 'bcrypt';

import db from "../db.js";

export async function signUp(req, res){
  const {name, email,password} = req.body;
  try {
    const passwordHash = bcrypt.hashSync(password, 10)

    await db.collection("users").insertOne({name, email, password: passwordHash})
    res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}

export async function logIn(req,res){
  try{
    const {data} = res.locals;
    res.send(data)
  }catch(e){
    console.log(chalk.bold.red("Erro no servidor"), e)
    res.send(e).status(500);
  }
}
