import express from "express";
import { deleteUser, getTeamMembers, getUserById, getUsers, updateUser } from "../controllers/userController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/team-members', protect, getTeamMembers);
router.get('/:id',protect,getUserById);
router.get('/',getUsers);
router.delete('/:id',protect,adminOnly,deleteUser);
router.put('/:id',protect,updateUser);
export default router;