import express from "express"
import {geetFeedPosts, getUserPosts,likePosts} from "../controllers/posts.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

//Read

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getFUserPosts);

//Update
router.patch("/:id/like", verifyToken, likePost );


export default router;

