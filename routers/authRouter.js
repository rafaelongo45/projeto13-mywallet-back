import express from "express";

import { signUp, logIn } from "../controllers/userController.js";
import { loginValidate } from "../middlewares/schemas/loginSchema.js"
import { signupValidate } from "../middlewares/schemas/signupSchema.js";
import { hasAccountCheck, validUserCheck } from "../middlewares/userValidationMiddleware.js";

const userRouter = express.Router(); 

userRouter.post("/signup", signupValidate, hasAccountCheck, signUp);
userRouter.post("/login", loginValidate, validUserCheck, logIn);

export default userRouter;