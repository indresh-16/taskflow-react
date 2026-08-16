const db = require("../config/db");
const express = require("express");

const router = express.Router();

function getTasks(req, res) {
    db.query(
        "SELECT * FROM tasks",
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            console.log("MYSQL RESULTS:", results);

            return res.status(200).json(results);
        }
    );
}

function createTasks(req, res) {

    const { text } = req.body;

    const sql = "INSERT INTO tasks (text, completed) VALUES (?, ?)";

    db.query(
        sql,
        [text, false],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            const newTask = {
                id: result.insertId,
                text: text,
                completed: false
            };

            console.log("NEW TASK:", newTask);

            return res.status(201).json(newTask);
        }
    );
}

function updateTasks(req,res){
    const {id} = req.params;
    const {completed} = req.body;
    db.query(
        "UPDATE tasks SET completed = ? where id = ?",
        [completed,id],
        (err,results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    message:"Database error",
                });
            }
            console.log("Task Updated:",results)
            return res.status(201).json({
                message:"Task updated successfully"
            });
        }
    )

}

function deleteTask(req, res) {
  const taskId = req.params.id;

  console.log(" BACKEND DELETE");
  console.log("ID:", taskId);

  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [taskId],
    (err, result) => {
      if (err) {
        console.log("MYSQL DELETE ERROR:", err);

        return res.status(500).json({
          message: "Database error",
        });
      }

      console.log("MYSQL RESULT:", result);

      return res.status(200).json({
        message: "Task deleted successfully",
      });
    }
  );
}
module.exports = {
    getTasks,
    createTasks,
    updateTasks,
    deleteTask
};