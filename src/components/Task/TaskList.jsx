import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  deleTask,
  toggleTask,
  filter,
}) {

  if (tasks.length === 0) {
    if (filter === "completed") {
      return <p>No completed tasks!</p>;
    }

    if (filter === "active") {
      return <p>No active tasks!</p>;
    }

    return <p>No tasks yet. Add a task to get started!</p>;
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleTask={deleTask}
          toggleTask={toggleTask}
        />
      ))}
    </>
  );
}