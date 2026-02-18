import express from "express";

import {
  getNames,
  createName,
  updateName,
  deleteName
} from "../controllers/names.controller.js";

import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getNames);

router.post("/", adminOnly, createName);
router.put("/:id", adminOnly, updateName);
router.delete("/:id", adminOnly, deleteName);

export default router;
