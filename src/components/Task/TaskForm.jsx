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

console.log("FORM PRIORITY:", priority);

// Send BOTH task text and selected priority
addTask(trimmedText, priority);

setInputValue("");
setPriority("Medium");


}

return ( <div className="text-center mt-3 p-3"> <form onSubmit={handleSubmit} className="flex gap-5">


    <input
      type="text"
      placeholder="Type your task"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="flex-1 border-1 pl-3 rounded-lg"
    />

    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="border-1 px-3 rounded-lg"
    >
      <option value="High">High 🔴</option>
      <option value="Medium">Medium 🟡</option>
      <option value="Low">Low 🟢</option>
    </select>

    <button
      type="submit"
      className="border-1 p-2 px-4 font-semibold rounded-lg"
    >
      Add
    </button>

  </form>
</div>


);
}
