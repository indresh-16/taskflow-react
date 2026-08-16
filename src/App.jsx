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

  // GET existing tasks from MySQL
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log("EXISTING TASKS:", data);
        setTasks(data);
      })
      .catch((error) => {
        console.log("GET ERROR:", error);
      });
  }, []);

  // CREATE
  function addTask(inputValue) {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputValue,
      }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        console.log("NEW TASK:", newTask);

        // Add ONLY the server response
        setTasks((prevTasks) => [...prevTasks, newTask]);
      })
      .catch((error) => {
        console.log("ADD ERROR:", error);
      });
  }

  // UPDATE
  function toggleTask(clickedTask) {
    const newCompleted = !Boolean(clickedTask.completed);

    fetch(`http://localhost:5000/tasks/${clickedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: newCompleted,
      }),
    })
      .then((response) => response.json())
      .then(() => {
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
      })
      .catch((error) => {
        console.log("UPDATE ERROR:", error);
      });
  }

  // DELETE
  function deleTask(taskId) {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
      })
      .catch((error) => {
        console.log("DELETE ERROR:", error);
      });
  }

  // FILTER
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
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
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
      </BrowserRouter></>


  );
  //return <h1 className='text-red-500 text-5xl font-bold'>Tailwindcss</h1>


}
export default App
