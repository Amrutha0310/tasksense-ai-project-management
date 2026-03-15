import Task from "../models/Task.js"

export const createTask = async(req,res)=>{

 const {title,description,project} = req.body

 const task = await Task.create({
  title,
  description,
  project
 })

 res.json(task)

}

export const getTasks = async(req,res)=>{

 const tasks = await Task.find().populate("project")

 res.json(tasks)

}