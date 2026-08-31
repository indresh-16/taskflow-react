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

return ( <div className="flex items-center justify-between mt-3 border-1 p-3 rounded-lg">


  {/* LEFT SIDE */}
  <div className="flex items-center gap-3 flex-1">

    {/* COMPLETE TOGGLE */}
    <input
      type="checkbox"
      checked={Boolean(task.completed)}
      onChange={() => toggleTask(task)}
      className="w-5 h-5 cursor-pointer"
    />

    {/* EDIT MODE OR NORMAL MODE */}
    {editing ? (
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="flex-1 border-1 rounded-lg px-3 py-2 outline-none"
        autoFocus
      />
    ) : (
      <div className="flex flex-col">

        {/* TASK TEXT */}
        <span
          className={
            task.completed
              ? "line-through text-green-900 font-semibold"
              : "text-blue-950 font-semibold"
          }
        >
          {task.text}
        </span>

        {/* PRIORITY */}
        <span className="text-sm text-gray-500">
          Priority: {task.priority || "Medium"}
        </span>

      </div>
    )}

  </div>

  {/* RIGHT SIDE BUTTONS */}
  <div className="flex gap-2 ml-3">

    {editing ? (
      <>
        <button
          onClick={handleSave}
          className="border-1 px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition cursor-pointer"
        >
          Save
        </button>

        <button
          onClick={handleCancel}
          className="border-1 px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition cursor-pointer"
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
          className="border-1 px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={() => deleTask(task.id)}
          className="border-1 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition cursor-pointer"
        >
          Delete
        </button>
      </>
    )}

  </div>

</div>


);
}
