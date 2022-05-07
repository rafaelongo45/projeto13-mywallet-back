import joi from "joi"

export function signupValidate(req,res, next){
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

  next();
}