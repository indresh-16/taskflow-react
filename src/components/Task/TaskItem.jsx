import { useState } from "react";

export default function TaskItem({
  task,
  deleTask,
  toggleTask,
  editTask,
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  async function handleSave() {
    const trimmedText = editText.trim();

    if (trimmedText === "") {
      return;
    }

    await editTask(task.id, trimmedText);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(task.text);
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

  // Priority badge styling with high dark mode contrast
  const priority = task.priority || "Medium";
  let priorityBadgeClasses = "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700/60";
  let priorityDotClass = "bg-amber-500 dark:bg-amber-400";

  if (priority.toLowerCase() === "high") {
    priorityBadgeClasses = "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700/60";
    priorityDotClass = "bg-rose-500 dark:bg-rose-400";
  } else if (priority.toLowerCase() === "low") {
    priorityBadgeClasses = "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-200 dark:border-emerald-700/60";
    priorityDotClass = "bg-emerald-500 dark:bg-emerald-400";
  }

  return (
    <div
      className={`group flex items-center justify-between gap-3 mt-3 p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-gray-50/80 dark:bg-slate-800/40 border-gray-200/70 dark:border-slate-800 opacity-90"
          : "bg-white dark:bg-slate-800/95 border-gray-200 dark:border-slate-700 shadow-sm hover:shadow hover:border-gray-300 dark:hover:border-slate-600"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* COMPLETE TOGGLE */}
        <label className="relative flex items-center justify-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => toggleTask(task)}
            className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-slate-500 focus:ring-green-500/20 dark:bg-slate-700 cursor-pointer transition-all accent-green-600 dark:accent-green-500"
          />
        </label>

        {/* EDIT MODE OR NORMAL MODE */}
        {editing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-50 dark:bg-slate-900 border border-blue-500 dark:border-blue-400 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white text-sm font-medium outline-none ring-2 ring-blue-500/20"
            autoFocus
          />
        ) : (
          <div className="flex flex-col min-w-0 flex-1">
            {/* TASK TEXT */}
            <span
              className={`text-sm md:text-base font-semibold break-words transition-all ${
                task.completed
                  ? "line-through text-emerald-600 dark:text-emerald-300 decoration-emerald-500 dark:decoration-emerald-400 decoration-2"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {task.text}
            </span>

            {/* PRIORITY */}
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${priorityBadgeClasses}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${priorityDotClass}`} />
                Priority: {priority}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-white text-xs md:text-sm font-semibold rounded-lg border border-gray-200 dark:border-slate-600 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditText(task.text);
                setEditing(true);
              }}
              className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-white text-xs md:text-sm font-semibold rounded-lg border border-gray-200 dark:border-slate-600 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => deleTask(task.id)}
              className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/60 text-red-600 dark:text-red-300 text-xs md:text-sm font-semibold rounded-lg border border-red-200 dark:border-red-800/60 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
