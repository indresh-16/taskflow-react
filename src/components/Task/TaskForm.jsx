import { useState } from "react"

export default function TaskForm({addTask}){
const [inputValue,setInputValue] = useState("");
function handleSubmit(e){
    e.preventDefault();
    if(inputValue.trim() === ""){
        //showPopup("fill the form")
        return ;
    }
    addTask(inputValue)
    setInputValue("")
}
    return <>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type a text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button type="submit" >Add</button>
            </form>
        </div>
    </>
}