const express = require("express");
const { updateUserRole } = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.put("/role/:id", authenticate, authorize(["admin"]), updateUserRole);

module.exports = router;
