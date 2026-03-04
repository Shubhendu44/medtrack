import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { toggleTodayStatus } from "../controllers/medicineController.js";
import {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.post("/", protect, addMedicine);
router.get("/", protect, getMedicines);
router.put("/:id", protect, updateMedicine);
router.delete("/:id", protect, deleteMedicine);
router.put("/toggle/:id", protect, toggleTodayStatus);


export default router;