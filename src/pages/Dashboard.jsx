import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard({ tasks = [], handleLogout }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.reduce(
    (count, task) => count + (Boolean(task.completed) ? 1 : 0),
    0
  );

  const activeTasks = totalTasks - completedTasks;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚡</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              TaskFlow
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
            Your productivity overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={handleLogout}
            className="border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all duration-150 shadow-sm text-sm font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        <section className="mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back 👋
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-1 font-medium text-base">
            Here's how your tasks are going.
          </p>
        </section>

        {/* 4 STATS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* TOTAL TASKS */}
          <div className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Total Tasks
              </p>
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 text-lg">
                📋
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              {totalTasks}
            </h3>
          </div>

          {/* ACTIVE TASKS */}
          <div className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Active Tasks
              </p>
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 text-lg">
                ⌛
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              {activeTasks}
            </h3>
          </div>

          {/* COMPLETED TASKS */}
          <div className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Completed
              </p>
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 text-lg">
                ✅
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              {completedTasks}
            </h3>
          </div>

          {/* PROGRESS */}
          <div className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Progress
              </p>
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 text-lg">
                📈
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              {progress}%
            </h3>
          </div>
        </section>

        {/* PROGRESS & SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OVERALL PROGRESS */}
          <div className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Overall Progress
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Task completion rate
                </p>
              </div>
              <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                {progress}%
              </span>
            </div>

            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-600">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-full transition-all duration-500 shadow-sm"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-4 flex items-center gap-1.5">
              <span className="text-slate-900 dark:text-white font-bold">{completedTasks}</span> of <span className="text-slate-900 dark:text-white font-bold">{totalTasks}</span> tasks completed
            </p>
          </div>

          {/* TASK SUMMARY */}
          <div className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
              Task Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-750/70 border border-slate-100 dark:border-slate-700/60">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Completed
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  {completedTasks}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-750/70 border border-slate-100 dark:border-slate-700/60">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Remaining
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  {activeTasks}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-750/70 border border-slate-100 dark:border-slate-700/60">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Total
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  {totalTasks}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 mb-5 font-medium">
            Continue managing your productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/tasks"
              className="inline-flex items-center justify-center gap-2 text-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl px-6 py-3.5 shadow-sm hover:shadow active:scale-95 transition-all duration-150 cursor-pointer"
            >
              <span>View All Tasks</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}