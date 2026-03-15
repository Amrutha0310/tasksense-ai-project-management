import express from "express"
import {createProject,getProjects} from "../controller/projectController.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create",authMiddleware,createProject)
router.get("/",authMiddleware,getProjects)

export default router