import { Link } from "react-router-dom";
import TaskForm from "../components/Task/TaskForm";
import TaskStats from "../components/Task/TaskStats";
import TaskList from "../components/Task/TaskList";

export default function Tasks({
  addTask,
  toggleTask,
  deleTask,
  tasks,
  filteredTask,
  filter,
  setFilter,
  loading,
  error,
  editTask,
  searchTerm,
  setSearchTerm,
  
}) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <TaskForm addTask={addTask} />
      
      <TaskList
        tasks={filteredTask}
        deleTask={deleTask}
        toggleTask={toggleTask}
        filter={filter}
        editTask={editTask}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />


      <TaskStats
        total={tasks.length}
        remaining={
          tasks.filter((task) => !Boolean(task.completed)).length
        }
        completed={
          tasks.filter((task) => Boolean(task.completed)).length
        }
      />

      <div className="flex justify-around mt-3">

        <button
          onClick={() => setFilter("all")}
          className="border-1 font-semibold pl-4 pr-4 rounded-lg"
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className="border-1 font-semibold pl-4 pr-4 rounded-lg"
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className="border-1 font-semibold pl-4 pr-4 rounded-lg"
        >
          Completed
        </button>
      </div>
      <Link
  to="/"
  className="inline-block mb-4 border-1 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
>
  ← Go to Dashboard
</Link>
    </>
  );
}