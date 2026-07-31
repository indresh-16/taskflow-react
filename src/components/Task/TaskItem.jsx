export default function TaskItem({task,deleTask,toggleTask}){
    return <>
            <div style={{display:"flex", alignSelf:"center"}}>
                 <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} value = {task}/> <p   className={task.completed ? "line-through" : "text-red-500"}>{task.text}</p>
                 <button onClick={() => deleTask(task)}>🗑️</button>
                    

        </div>
    </>
}