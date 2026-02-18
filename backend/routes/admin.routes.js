import express from "express";

import {
  getAllUsers,
  deleteUser,
  changeRole
} from "../controllers/admin.controller.js";

import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", changeRole);

export default router;
