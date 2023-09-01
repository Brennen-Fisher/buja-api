import express from "express";
import { delList, deleteUser, getUser, saveList, setList } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id",verifyToken, deleteUser);
router.put("/save/:id",verifyToken, saveList);
router.put("/set/:id",verifyToken, setList);
router.put("/del/:id",verifyToken, delList);
router.get("/get/:id",verifyToken, getUser);

export default router;