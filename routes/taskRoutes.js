const express = require("express");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");
const upload = require("../middlewares/multerConfig");

const router = express.Router();

router.post("/", authMiddleware, upload.single("file"), createTask);
router.get("/", authMiddleware, getTasks);
router.delete("/tasks/:id", authMiddleware, authorize(["admin"]), deleteTask);

module.exports = router;
