const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware")

const {getTasks,createTasks, updateTasks,deleteTask} = require("../controllers/taskcontroller")

router.get("/tasks", verifyToken, getTasks);
router.post("/tasks", verifyToken, createTasks);
router.put("/tasks/:id", verifyToken, updateTasks);
router.delete("/tasks/:id", verifyToken, deleteTask);


module.exports = router;