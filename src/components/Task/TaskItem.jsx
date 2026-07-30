export default function TaskItem({task,deleTask,toggleTask}){
    return <>
            <div style={{display:"flex", alignSelf:"center"}}>
                 <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} value = {task}/> <p>{task.text}</p>
                 <button onClick={() => deleTask(clickedtask)}>🗑️</button>
                    

        </div>
    </>
}