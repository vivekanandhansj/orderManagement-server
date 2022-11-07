import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //1. check name
    const user = await User.findOne({ email: req.body.email });
    //2. user not found
    if (!user) return next(createError(404, "User not found!"));
    // user found
    //3. check user password same or not
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    //4.  whether password wrong
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
    //5. JWT
    let token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.JWT,
      { expiresIn: "1h" }
    );
    res.json({ token }).status(200);
  
  } catch (err) {
    next(err);
  }
};

