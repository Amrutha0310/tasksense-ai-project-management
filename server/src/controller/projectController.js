import Project from "../models/Project.js"

export const createProject = async(req,res)=>{

 const {title,description} = req.body

 const project = await Project.create({
  title,
  description,
  createdBy:req.user.id
 })

 res.json(project)

}

export const getProjects = async(req,res)=>{

 const projects = await Project.find()

 res.json(projects)

}