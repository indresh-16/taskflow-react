import TaskForm from "../Task/TaskForm";
import TaskItem from "../Task/TaskItem";
import TaskList from "../Task/TaskList";

export default function Header(){
    return <>
    <div className="text-center" >
        <h1 className="text-4xl font-bold text-center mb-3  text-gray-900">✅ TaskFlow</h1>
        <p className="text-2xl">Manage your daily tasks easily</p>
    </div>
        
    </>
}