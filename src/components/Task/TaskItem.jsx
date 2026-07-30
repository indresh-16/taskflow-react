export default function TaskItem({task,deleTask}){
    return <>
            <div style={{display:"flex", alignSelf:"center"}}>
                 <input type="checkbox" value = {task}/> <p>{task}</p>
                 <button onClick={() => deleTask(task)}>🗑️</button>
                    

        </div>
    </>
}