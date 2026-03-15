import User from "../models/user.js";
import bcrypt from "bcrypt";
import {genToken} from "../utils/generateToken.js";

export const registerUser = async(req,res)=>{

 const {name,email,password} = req.body

 const hashed = await bcrypt.hash(password,10)

 const user = await User.create({
  name,
  email,
  password:hashed
 })

 genToken(user,res)

 res.json(user)

}

export const loginUser = async(req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email})

 const match = await bcrypt.compare(password,user.password)

 if(!match){
  return res.status(400).json("Invalid credentials")
 }

 genToken(user,res)

 res.json(user)

}