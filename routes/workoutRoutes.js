import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", protect, getWorkouts);
router.post("/", protect, createWorkout);
router.put("/:id", protect, updateWorkout);
router.delete("/:id", protect, deleteWorkout);

export default router;