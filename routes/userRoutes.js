import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed successfully!",
    userId: req.user.id,
  });
});

export default router;