import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");


useEffect(() => {
    const loadTasks = () => {

        const token = localStorage.getItem("token");

        console.log("TASK TOKEN:", token);

        if (!token || token === "null" || token === "undefined") {
            console.log("No valid JWT. Skipping tasks request.");
            setTasks([]);
            return;
        }

        fetch("http://localhost:5000/tasks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {

            console.log("TASK RESPONSE:", data);

            if (!Array.isArray(data)) {
                console.log("TASK ERROR:", data);
                setTasks([]);
                return;
            }

            setTasks(data);
        })
        .catch(error => {
            console.log("GET ERROR:", error);
            setTasks([]);
        });
    };

    loadTasks();
}, []);

function addTask(inputValue) {

    const token = localStorage.getItem("token");

    console.log("========== ADD TASK ==========");
    console.log("TOKEN:", token);
    console.log("TEXT:", inputValue);

    if (!token) {
        console.log("❌ No JWT found");
        return;
    }

    fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            text: inputValue
        })
    })
    .then(response => response.json())
    .then(data => {

        console.log("ADD RESPONSE:", data);

        if (!data.id) {
            console.log("❌ TASK NOT CREATED:", data);
            return;
        }

        setTasks(prevTasks => [
            ...prevTasks,
            data
        ]);
    })
    .catch(error => {
        console.log("ADD ERROR:", error);
    });
}

function toggleTask(clickedTask) {

    const token = localStorage.getItem("token");

    const newCompleted = !Boolean(clickedTask.completed);

    fetch(`http://localhost:5000/tasks/${clickedTask.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            completed: newCompleted
        })
    })
    .then(response => response.json())
    .then(data => {

        console.log("UPDATE RESPONSE:", data);

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === clickedTask.id
                    ? {
                        ...task,
                        completed: newCompleted
                    }
                    : task
            )
        );
    })
    .catch(error => {
        console.log("UPDATE ERROR:", error);
    });
}

function deleTask(taskId) {

    const token = localStorage.getItem("token");

    console.log("DELETE ID:", taskId);

    fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log("DELETE RESPONSE:", data);

        setTasks(prevTasks =>
            prevTasks.filter(task => task.id !== taskId)
        );
    })
    .catch(error => {
        console.log("DELETE ERROR:", error);
    });
}
  const filteredTask = tasks.filter((task) => {
    if (filter === "active") {
      return !Boolean(task.completed);
    }

    if (filter === "completed") {
      return Boolean(task.completed);
    }

    return true;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/tasks"
          element={
            <Tasks
              addTask={addTask}
              tasks={tasks}
              filteredTask={filteredTask}
              deleTask={deleTask}
              toggleTask={toggleTask}
              filter={filter}
              setFilter={setFilter}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
