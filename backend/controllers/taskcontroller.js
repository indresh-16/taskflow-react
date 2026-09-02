const db = require("../config/db");

const getTasks = (req, res) => {
    const userId = req.user.id;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ? ORDER BY id ASC",
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to get tasks"
                });
            }

            res.json(results);
        }
    );
};

const createTasks = (req, res) => {
    const { text, priority } = req.body;
    const userId = req.user.id;

    if (!text || text.trim() === "") {
        return res.status(400).json({
            message: "Task text is required"
        });
    }

    db.query(
        `INSERT INTO tasks 
        (text, completed, user_id, priority) 
        VALUES (?, ?, ?, ?)`,
        [
            text.trim(),
            false,
            userId,
            priority || "Medium"
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to create task"
                });
            }

            return res.status(201).json({
                id: result.insertId,
                text: text.trim(),
                completed: false,
                priority: priority || "Medium",
                user_id: userId
            });
        }
    );
};

const updateTasks = (req, res) => {
    const taskId = req.params.id;
    const { text, completed, priority } = req.body;
    const userId = req.user.id;

    const updates = [];
    const values = [];

    if (text !== undefined) {
        updates.push("text = ?");
        values.push(text.trim());
    }

    if (completed !== undefined) {
        updates.push("completed = ?");
        values.push(completed);
    }

    if (priority !== undefined) {
        updates.push("priority = ?");
        values.push(priority);
    }

    if (updates.length === 0) {
        return res.status(400).json({
            message: "No valid fields to update"
        });
    }

    values.push(taskId, userId);

    db.query(
        `UPDATE tasks
         SET ${updates.join(", ")}
         WHERE id = ? AND user_id = ?`,
        values,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to update task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found or not yours"
                });
            }

            return res.json({
                id: Number(taskId),
                text: text !== undefined ? text.trim() : undefined,
                completed: completed !== undefined ? completed : undefined,
                priority: priority !== undefined ? priority : undefined,
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
                return res.status(500).json({
                    message: "Failed to delete task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found or not yours"
                });
            }

            return res.json({
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
