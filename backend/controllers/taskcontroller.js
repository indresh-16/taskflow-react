const db = require("../config/db");

const getTasks = (req, res) => {

    const userId = req.user.id;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ? ORDER BY id ASC",
        [userId],
        (err, results) => {

            if (err) {
                console.log("GET TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to get tasks"
                });
            }

            res.json(results);
        }
    );
};

const createTasks = (req, res) => {

    const { text } = req.body;

    console.log("========== CREATE TASK ==========");
    console.log("REQ.USER:", req.user);
    console.log("USER ID:", req.user?.id);
    console.log("TEXT:", text);

    const userId = req.user.id;

    db.query(
        "INSERT INTO tasks (text, completed, user_id) VALUES (?, ?, ?)",
        [text, false, userId],
        (err, result) => {

            if (err) {
                console.log("CREATE ERROR:", err);

                return res.status(500).json({
                    message: "Failed to create task"
                });
            }

            console.log("INSERTED USER ID:", userId);

            res.status(201).json({
                id: result.insertId,
                text,
                completed: false,
                user_id: userId
            });
        }
    );
};
const updateTasks = (req, res) => {

    const taskId = req.params.id;
    const { completed } = req.body;
    const userId = req.user.id;

    db.query(
        `UPDATE tasks
         SET completed = ?
         WHERE id = ? AND user_id = ?`,
        [completed, taskId, userId],
        (err, result) => {

            if (err) {
                console.log("UPDATE ERROR:", err);

                return res.status(500).json({
                    message: "Failed to update task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found or not yours"
                });
            }

            res.json({
                message: "Task updated successfully"
            });
        }
    );
};


const deleteTask = (req, res) => {

    const taskId = req.params.id;
    const userId = req.user.id;

    db.query(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [taskId, userId],
        (err, result) => {

            if (err) {
                console.log("DELETE ERROR:", err);

                return res.status(500).json({
                    message: "Failed to delete task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found or not yours"
                });
            }

            res.json({
                message: "Task deleted successfully"
            });
        }
    );
};
module.exports = {
  getTasks,
  createTasks,
  updateTasks,
  deleteTask,
};
