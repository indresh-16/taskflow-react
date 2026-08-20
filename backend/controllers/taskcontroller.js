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
    const userId = req.user.id;

    if (!text || text.trim() === "") {
        return res.status(400).json({
            message: "Task text is required"
        });
    }

    db.query(
        "INSERT INTO tasks (text, completed, user_id) VALUES (?, ?, ?)",
        [text, 0, userId],
        (err, result) => {

            if (err) {
                console.log("CREATE TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to create task"
                });
            }

            res.status(201).json({
                id: result.insertId,
                text: text,
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
                console.log("UPDATE TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to update task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
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
                console.log("DELETE TASK ERROR:", err);

                return res.status(500).json({
                    message: "Failed to delete task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
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
