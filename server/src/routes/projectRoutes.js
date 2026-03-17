import express from 'express';
import protect  from "../middleware/authMiddleware.js";  // Correct import

const router = express.Router();

// Use protect middleware
router.get('/projects', protect, (req, res) => {
  res.json({ message: 'Protected route accessed' });
});

export default router;