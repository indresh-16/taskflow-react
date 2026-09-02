import { Link } from "react-router-dom";
import TaskForm from "../components/Task/TaskForm";
import TaskStats from "../components/Task/TaskStats";
import TaskList from "../components/Task/TaskList";
import ThemeToggle from "../components/ThemeToggle";

export default function Tasks({
  addTask,
  toggleTask,
  deleteTask,
  deleTask = deleteTask,
  tasks = [],
  filteredTask = [],
  filter,
  setFilter,
  loading,
  error,
  editTask,
  searchTerm,
  setSearchTerm,
}) {
  const activeCount = tasks.filter((t) => !Boolean(t.completed)).length;
  const completedCount = tasks.filter((t) => Boolean(t.completed)).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm"
          >
            <span>←</span>
            <span>Go to Dashboard</span>
          </Link>

          <ThemeToggle />
        </div>

        {/* PAGE TITLE */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span>Tasks</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
              {tasks.length}
            </span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            Organize, prioritize, and check off your daily goals.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center gap-2 p-3.5 mb-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 text-sm font-semibold border border-blue-200 dark:border-blue-800/60">
            <svg className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Loading tasks...</span>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="p-3.5 mb-4 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 text-sm font-semibold border border-red-200 dark:border-red-800/60">
            {error}
          </div>
        )}

        {/* SEARCH BAR */}
        {setSearchTerm && (
          <div className="relative mb-4">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white p-1 text-xs cursor-pointer font-bold"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* TASK FORM */}
        <TaskForm addTask={addTask} />

        {/* FILTER BUTTONS */}
        <div className="flex items-center gap-2 p-1.5 mb-4 rounded-xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 cursor-pointer ${
              filter === "all"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All ({tasks.length})
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 cursor-pointer ${
              filter === "active"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Active ({activeCount})
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 cursor-pointer ${
              filter === "completed"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* TASK LIST */}
        <TaskList
          tasks={filteredTask}
          deleteTask={deleteTask || deleTask}
          deleTask={deleTask || deleteTask}
          toggleTask={toggleTask}
          filter={filter}
          editTask={editTask}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* TASK STATS */}
        <TaskStats
          total={tasks.length}
          remaining={activeCount}
          completed={completedCount}
        />
      </div>
    </div>
  );
}