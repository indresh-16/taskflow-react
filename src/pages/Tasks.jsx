import TaskForm from "../components/Task/TaskForm";
import TaskStats from "../components/Task/TaskStats";
import TaskList from "../components/Task/TaskList";

export default function Tasks({
  addTask,
  toggleTask,
  tasks,
  filteredTask,
  deleTask,
  filter,
  setFilter,
}) {
  return (
    <>

      <TaskForm addTask={addTask} />

      
      <TaskList
        tasks={filteredTask}
        deleTask={deleTask}
        toggleTask={toggleTask}
        filter={filter}
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
    </>
  );
}