import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post('/register',upload.single('profileImage'), registerUser);
router.post('/login',loginUser);
router.get('/profile' ,protect,getProfile);
export default router;