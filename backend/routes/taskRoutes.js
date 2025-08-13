import express from "express";
import { createTask, deleteTask, getAdminDashboard, getTaskDetailsById, getTasks, getUserDashboard, updateChecklist, updateStatus, updateTask } from "../controllers/taskController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/',protect,createTask)
router.get('/',protect,getTasks);
router.get('/user-dashboard',protect,getUserDashboard);
router.get('/dashboard',protect,adminOnly,getAdminDashboard);

router.put('/:id',protect,updateTask);
router.delete('/:id',protect,deleteTask);

router.put('/:id/checklist',updateChecklist);
router.put('/:id/status', protect,updateStatus);




router.get('/:id',protect,getTaskDetailsById);

export default router;