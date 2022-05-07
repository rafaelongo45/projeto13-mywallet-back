import joi from "joi"

export function postTransactionSchema(req,res,next){
  const { description, amount, type } = req.body;

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
  
  next();
}