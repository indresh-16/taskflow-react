import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";

export default function Header(){
    return <>
        <h1>✅ Task Flow</h1>
        <p>Manage your daily tasks easily</p>
        <TaskForm/>
        <TaskItem/>
        <TaskList/>
    </>
}