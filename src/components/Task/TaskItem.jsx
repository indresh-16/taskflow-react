export default function TaskItem({
  task,
  deleTask,
  toggleTask,
}) {
  return (
    <div className="flex items-center justify-between mt-3">

      <div className="flex items-center gap-2">

        <input
          type="checkbox"
          checked={Boolean(task.completed)}
          onChange={() => toggleTask(task)}
          className="w-5 h-5 mr-2 border-1"
        />

        <span
          className={task.completed ? "line-through text-green-900 font-semibold" :"text-blue-950 font-semibold"}
        >
          {task.text}
        </span>

      </div>

      <button
        onClick={() => deleTask(task.id)}
        className="border-1 px-4 py-2 rounded-lg"
      >
        Delete
      </button>

    </div>
  );
}