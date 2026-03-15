import jwt from "jsonwebtoken"

export const genToken = (user,res)=>{

 const token = jwt.sign(
  {id:user._id,role:user.role},
  process.env.JWT_SECRET,
  {expiresIn:"1d"}
 )

 res.cookie("authToken",token,{
  httpOnly:true,
  maxAge:1000*60*60*24
 })

}