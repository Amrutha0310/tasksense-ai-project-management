import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({

 title:String,

 description:String,

 status:{
  type:String,
  default:"todo"
 },

 project:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Project"
 }

})

export default mongoose.model("Task",TaskSchema)