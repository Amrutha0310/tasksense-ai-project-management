import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({

 title:String,

 description:String,

 createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 }

})

export default mongoose.model("Project",ProjectSchema)