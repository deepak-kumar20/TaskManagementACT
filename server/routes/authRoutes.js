import express from "express";
import {
  registerUser,
  loginUser,
  getDashboardData,
} from "../controllers/authController.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Protected routes
router.get("/dashboard", protect, getDashboardData);

// Task Routes
router.post("/tasks", protect, createTask);
router.get("/tasks", protect, getTasks);
router.get("/tasks/:id", protect, getTask);
router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

// Lead Routes
router.post("/leads", protect, createLead);
router.get("/leads", protect, getLeads);
router.get("/leads/:id", protect, getLead);
router.put("/leads/:id", protect, updateLead);
router.delete("/leads/:id", protect, deleteLead);

export default router;
