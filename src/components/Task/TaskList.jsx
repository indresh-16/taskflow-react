import TaskItem from "./TaskItem"
export default function TaskList({tasks,deleTask,toggleTask,filter}){
   /* if(tasks.length === 0){
        return 
    }*/

    if(tasks.length === 0){
        if(filter === "completed"){
            return <div className="ml-3 mt-2 font-semibold"><p>No completed tasks !</p></div>
        }
        if(filter === "active"){
            return <div className="ml-3 mt-2 font-semibold"><p>No Active tasks !</p></div>

        }
        return <div className="ml-3 mt-2 font-semibold"><p>No tasks yet. Add a task to get started!</p></div>
    }
    return <>
        {tasks.map((item,index) => (
            <TaskItem key={index} task={item} deleTask={deleTask} toggleTask={toggleTask}/>
        ))}
    </>
}