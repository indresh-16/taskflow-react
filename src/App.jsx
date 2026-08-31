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
    const data = await apiRequest(
      "http://localhost:5000/tasks"
    );

    console.log("EXISTING TASKS:", data);

    if (Array.isArray(data)) {
      setTasks(data);
    }

  } catch (error) {
    console.log("GET ERROR:", error);
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


console.log("APP TEXT:", inputValue);
console.log("APP PRIORITY:", priority);

try {
  const data = await apiRequest(
    "http://localhost:5000/tasks",
    {
      method: "POST",

      body: JSON.stringify({
        text: inputValue,
        priority: priority
      })
    }
  );

  console.log("ADD RESPONSE:", data);

  setTasks((prevTasks) => [
    ...prevTasks,
    data
  ]);

} catch (error) {
  console.log("ADD TASK ERROR:", error);
  setError("Failed to add task");

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
  await apiRequest(
    `http://localhost:5000/tasks/${clickedTask.id}`,
    {
      method: "PUT",

      body: JSON.stringify({
        completed: newCompleted
      })
    }
  );

  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === clickedTask.id
        ? {
            ...task,
            completed: newCompleted
          }
        : task
    )
  );

} catch (error) {
  console.log("UPDATE ERROR:", error);
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
  await apiRequest(
    `http://localhost:5000/tasks/${taskId}`,
    {
      method: "PUT",

      body: JSON.stringify({
        text: newText
      })
    }
  );

  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            text: newText
          }
        : task
    )
  );

} catch (error) {
  console.log("EDIT ERROR:", error);
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
  await apiRequest(
    `http://localhost:5000/tasks/${taskId}`,
    {
      method: "DELETE"
    }
  );

  setTasks((prevTasks) =>
    prevTasks.filter((task) => task.id !== taskId)
  );

} catch (error) {
  console.log("DELETE ERROR:", error);
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

return ( <BrowserRouter>


  <Routes>

    <Route
      path="/login"
      element={
        <Login
          setIsLoggedIn={setIsLoggedIn}
        />
      }
    />

    <Route
      path="/register"
      element={<Register />}
    />


    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Dashboard
            tasks={tasks}
            handleLogout={handleLogout}
          />
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
