import TaskItem from "./TaskItem"
export default function TaskList({tasks,deleTask,toggleTask}){
    return <>
        {tasks.map((item,index) => (
            <TaskItem key={index} task={item} deleTask={deleTask} toggleTask={toggleTask}/>
        ))}
    </>
}