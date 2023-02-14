import express from "expres"
import { login } from "../controllers/auth.js";
import {getUser,getUserFriends,addRemoveFriend} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ=>get friends

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//Update friends
router.patch("/:id:friendId", verifyToken, addRemoveFriend)




export default router;