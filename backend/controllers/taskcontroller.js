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
const { text, priority } = req.body;
const userId = req.user.id;


console.log("========== CREATE TASK ==========");
console.log("TEXT:", text);
console.log("PRIORITY RECEIVED:", priority);
console.log("USER ID:", userId);

db.query(
    `INSERT INTO tasks 
    (text, completed, user_id, priority) 
    VALUES (?, ?, ?, ?)`,
    [
        text,
        false,
        userId,
        priority || "Medium"
    ],
    (err, result) => {
        if (err) {
            console.log("CREATE ERROR:", err);

            return res.status(500).json({
                message: "Failed to create task"
            });
        }

        console.log("TASK CREATED WITH PRIORITY:", priority);

        return res.status(201).json({
            id: result.insertId,
            text: text,
            completed: false,
            priority: priority || "Medium",
            user_id: userId
        });
    }
);

};

const updateTasks = (req, res) => {

    const taskId = req.params.id;
    const { text, completed } = req.body;
    const userId = req.user.id;

    // Editing task text
    if (text !== undefined) {

        db.query(
            `UPDATE tasks
             SET text = ?
             WHERE id = ? AND user_id = ?`,
            [text, taskId, userId],
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

                return res.json({
                    id: Number(taskId),
                    text,
                    message: "Task text updated successfully"
                });
            }
        );

        return;
    }

    // Updating completed status
    if (completed !== undefined) {

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
                    id: Number(taskId),
                    completed,
                    message: "Task status updated successfully"
                });
            }
        );

        return;
    }

    res.status(400).json({
        message: "No valid fields to update"
    });
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
