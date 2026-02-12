import express from "express";
import register from "../controllers/register.controller.js";
import login from "../controllers/login.controller.js";
import logout from "../controllers/logout.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
