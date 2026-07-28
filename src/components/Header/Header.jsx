import TaskForm from "../Task/TaskForm";
import TaskItem from "../Task/TaskItem";
import TaskList from "../Task/TaskList";

export default function Header(){
    return <>
        <h1>✅ Task Flow</h1>
        <p>Manage your daily tasks easily</p>
        <TaskForm/>
        <TaskItem/>
        <TaskList/>
    </>
}