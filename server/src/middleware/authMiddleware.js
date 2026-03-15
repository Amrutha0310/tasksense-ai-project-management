import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next)=>{

 const token = req.cookies.authToken

 if(!token){
  return res.status(401).json("Not authorized")
 }

 try{

  const decoded = jwt.verify(token,process.env.JWT_SECRET)

  req.user = decoded

  next()

 }catch(error){

  res.status(401).json("Invalid token")

 }

}