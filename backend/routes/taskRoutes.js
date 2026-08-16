const express = require("express");
const router = express.Router();

const {getTasks,createTasks, updateTasks,deleteTask} = require("../controllers/taskcontroller")

router.get("/tasks",getTasks);
router.post("/tasks",createTasks);
router.put("/tasks/:id",updateTasks);
router.delete("/tasks/:id",deleteTask);

module.exports = router;