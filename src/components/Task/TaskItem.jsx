export default function TaskItem({task,deleTask,toggleTask}){
    return <>
        <div className="shadow-lg border rounded-lg p-3 flex justify-between items-center mb-3"> 
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} value = {task}  className="w-5 h-5 mr-2"/> 
                <p className={task.completed ? "line-through text-green-900 font-semibold" :"text-blue-950 font-semibold"  }>{task.text}</p>
            </div><button onClick={() => deleTask(task)}>🗑️</button>
        </div>
    </>
}