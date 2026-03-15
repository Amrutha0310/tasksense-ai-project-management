import express from "express"
import {createTask,getTasks} from "../controllers/taskController.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create",authMiddleware,createTask)
router.get("/",authMiddleware,getTasks)

export default router