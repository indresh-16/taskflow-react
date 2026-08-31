import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  deleTask,
  toggleTask,
  editTask,
  filter,
}) {
  if (tasks.length === 0) {
    if (filter === "completed") {
      return (
        <div className="py-12 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-slate-900 dark:text-white font-bold text-base">No completed tasks!</p>
          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1">Complete tasks to see them here.</p>
        </div>
      );
    }

    if (filter === "active") {
      return (
        <div className="py-12 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">✨</div>
          <p className="text-slate-900 dark:text-white font-bold text-base">No active tasks!</p>
          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1">You're all caught up or have completed everything.</p>
        </div>
      );
    }

    return (
      <div className="py-12 px-4 text-center rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
        <div className="text-3xl mb-2">📝</div>
        <p className="text-slate-900 dark:text-white font-bold text-base">No tasks yet. Add a task to get started!</p>
        <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1">Stay organized and productive every day.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleTask={deleTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}
