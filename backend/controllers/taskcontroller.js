const db = require("../config/db");

// ================================
// GET ALL TASKS FOR LOGGED-IN USER
// ================================
const getTasks = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY id ASC",
    [userId],
    (err, results) => {
      if (err) {
        console.error("GET TASKS ERROR:", err);

        return res.status(500).json({
          message: "Failed to get tasks",
        });
      }

      return res.status(200).json(results);
    }
  );
};


// ================================
// CREATE NEW TASK
// ================================
const createTasks = (req, res) => {
  const { text, priority } = req.body;
  const userId = req.user.id;

  if (!text || text.trim() === "") {
    return res.status(400).json({
      message: "Task text is required",
    });
  }

  db.query(
    `INSERT INTO tasks (text, completed, user_id, priority)
     VALUES (?, ?, ?, ?)`,
    [
      text.trim(),
      false,
      userId,
      priority || "Medium",
    ],
    (err, result) => {
      if (err) {
        console.error("CREATE TASK ERROR:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      return res.status(201).json({
        id: result.insertId,
        text: text.trim(),
        completed: false,
        user_id: userId,
        priority: priority || "Medium",
      });
    }
  );
};


// ================================
// UPDATE TASK
// ================================
const updateTasks = (req, res) => {
  const taskId = req.params.id;
  const { text, completed, priority } = req.body;
  const userId = req.user.id;

  const updates = [];
  const values = [];

  // Update task text
  if (text !== undefined) {
    if (!text.trim()) {
      return res.status(400).json({
        message: "Task text cannot be empty",
      });
    }

    updates.push("text = ?");
    values.push(text.trim());
  }

  // Update completion status
  if (completed !== undefined) {
    updates.push("completed = ?");
    values.push(completed);
  }

  // Update priority
  if (priority !== undefined) {
    updates.push("priority = ?");
    values.push(priority);
  }

  if (updates.length === 0) {
    return res.status(400).json({
      message: "No valid fields to update",
    });
  }

  values.push(taskId, userId);

  const query = `
    UPDATE tasks
    SET ${updates.join(", ")}
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("UPDATE TASK ERROR:", err);

      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found or not yours",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
    });
  });
};


// ================================
// DELETE TASK
// ================================
const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId],
    (err, result) => {
      if (err) {
        console.error("DELETE TASK ERROR:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Task not found or not yours",
        });
      }

      return res.status(200).json({
        message: "Task deleted successfully",
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