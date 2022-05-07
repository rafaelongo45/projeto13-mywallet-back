import joi from "joi"

export function loginValidate(req,res,next){
  const {email, password} = req.body;

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.any().required()
  });

  const {error, value} = schema.validate({email, password}, {abortEarly:false});

  if(error){
    res.status(422).send(error.details.map(e => e.message));
    return 
  }
  next();
}