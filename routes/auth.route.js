import express from "express";

import { login, logout, register, resetPass, resetUser } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",verifyToken,logout);
router.put("/set/:id",verifyToken,resetUser);
router.put("/pass/:id",verifyToken,resetPass);
// router.get("/test",test);


export default router;