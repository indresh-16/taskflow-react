import TaskItem from "./TaskItem"
export default function TaskList({tasks,deleTask}){
    return <>
        {tasks.map((item,index) => (
            <TaskItem key={index} task={item} deleTask={deleTask}/>
        ))}
    </>
}