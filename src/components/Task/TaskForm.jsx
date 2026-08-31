import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedText = inputValue.trim();

    if (trimmedText === "") {
      return;
    }

    // Send BOTH task text and selected priority
    addTask(trimmedText, priority);

    setInputValue("");
    setPriority("Medium");
  }

  return (
    <div className="mt-4 mb-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 p-2.5 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200"
      >
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-3.5 text-slate-400 dark:text-slate-400 select-none">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 text-sm md:text-base font-medium outline-none rounded-xl"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-semibold outline-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
          >
            <option value="High" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium">High 🔴</option>
            <option value="Medium" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium">Medium 🟡</option>
            <option value="Low" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium">Low 🟢</option>
          </select>

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
}
