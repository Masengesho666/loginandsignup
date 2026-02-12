import express from "express";
import {
  getNames,
  getName,
  createName,
  updateName,
  deleteName
} from "../controllers/names.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect); // all routes protected

router.get("/", getNames);
router.get("/:id", getName);
router.post("/", createName);
router.put("/:id", updateName);
router.delete("/:id", deleteName);

export default router;
