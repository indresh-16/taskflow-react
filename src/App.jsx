import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import { apiRequest } from "./api/api";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET LOGGED-IN USER'S TASKS
  useEffect(() => {
    if (!isLoggedIn) {
      setTasks([]);
      return;
    }

    async function fetchTasks() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiRequest("https://calm-cat-production-3639.up.railway.app/tasks");
        if (Array.isArray(data)) {
          setTasks(data);
        }
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [isLoggedIn]);

  // ADD TASK WITH PRIORITY
  async function addTask(inputValue, priority) {
  setLoading(true);
  setError(null);

  try {
    const data = await apiRequest(
      "https://calm-cat-production-3639.up.railway.app/tasks",
      {
        method: "POST",
        body: JSON.stringify({
          text: inputValue,
          priority: priority,
        }),
      }
    );

    setTasks((prevTasks) => [...prevTasks, data]);

  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    setError(err.message || "Failed to add task");

  } finally {
    setLoading(false);
  }
}

  // TOGGLE TASK COMPLETION
  async function toggleTask(clickedTask) {
    const newCompleted = !Boolean(clickedTask.completed);

    setLoading(true);
    setError(null);

    try {
      await apiRequest(`https://calm-cat-production-3639.up.railway.app/tasks/${clickedTask.id}`, {
        method: "PUT",
        body: JSON.stringify({
          completed: newCompleted,
        }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === clickedTask.id
            ? {
              ...task,
              completed: newCompleted,
            }
            : task
        )
      );
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  }

  // EDIT TASK TEXT
  async function editTask(taskId, newText) {
    setLoading(true);
    setError(null);

    try {
      await apiRequest(`https://calm-cat-production-3639.up.railway.app/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({
          text: newText,
        }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
              ...task,
              text: newText,
            }
            : task
        )
      );
    } catch (err) {
      setError("Failed to edit task");
    } finally {
      setLoading(false);
    }
  }

  // DELETE TASK
  async function deleTask(taskId) {
    setLoading(true);
    setError(null);

    try {
      await apiRequest(`https://calm-cat-production-3639.up.railway.app/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  }

  // LOGOUT
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTasks([]);
    setSearchTerm("");
    setFilter("all");
  }

  // SEARCH + STATUS FILTER
  const filteredTask = tasks.filter((task) => {
    // ACTIVE FILTER
    if (filter === "active" && Boolean(task.completed)) {
      return false;
    }

    // COMPLETED FILTER
    if (filter === "completed" && !Boolean(task.completed)) {
      return false;
    }

    // SEARCH FILTER
    return (task.text || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard tasks={tasks} handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks
                addTask={addTask}
                tasks={tasks}
                filteredTask={filteredTask}
                deleTask={deleTask}
                toggleTask={toggleTask}
                editTask={editTask}
                filter={filter}
                setFilter={setFilter}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
