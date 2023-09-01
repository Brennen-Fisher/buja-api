import express from "express";
import { deletePost, createPost, getPost, getPosts, updatePost, getSaved, getRand, setVerified } from "../controller/list.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/createPost",verifyToken,createPost);
router.delete("/:id",verifyToken,deletePost);
router.get("/posts", getPosts);
router.get("/random", getRand);
router.get("/:id", getPost);
router.get("/saved/:id",verifyToken, getSaved);
router.put("/:id", updatePost);
router.put("/ver/:id", setVerified);

export default router;