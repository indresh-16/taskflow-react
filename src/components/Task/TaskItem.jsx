export default function TaskItem({task}){
    return <>
            <div style={{display:"flex", alignSelf:"center"}}>
                 <input type="checkbox"/> <p>{task}</p>
        </div>
    </>
}