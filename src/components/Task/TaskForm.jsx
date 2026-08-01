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
        <div className="text-center mt-3 p-3 ">
            <form onSubmit={handleSubmit} className="  flex gap-5  ">
                <input type="text" placeholder="Type a text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 border-1 pl-3 rounded-lg"/>
                <button type="submit"  className=" border-1 p-2 px-4 font-semibold hover:bg-gray-50 active:scale-95 transition duration-200 cursor-pointer focus:right-2 rounded-lg" >Add</button>
            </form>
        </div>
    </>
}