import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import TaskList from './components/Task/TaskList'
import TaskForm from './components/Task/TaskForm'


function App() {
  const [tasks,setTasks] = useState([]);
  function addTask(inputValue){
     setTasks([...tasks,{text:inputValue,completed:false}])
  }
  function toggleTask(clickedTask){
    setTasks(
      tasks.map((task) => {
        if(task.text === clickedTask.text){
          return {
            ...task,
            completed:!task.completed
          };
        }
        return task
      })
    )
  }
    function deleTask(TasktoDelete){
    setTasks(
      tasks.filter((task) => task.text !== TasktoDelete.text)
    )
  }
  return <>
    <div className=' w-screen min-h-screen flex flex-col items-center justify-center'>
        <div className=' bg-white p-6 pt-8 pb-7 rounded-lg shadow-lg w-96  '>
          <Header/>
          <TaskForm addTask={addTask}/>
          <TaskList tasks={tasks} 
          deleTask ={deleTask}
          toggleTask={toggleTask}
          />
        </div>
    </div>
  </>
  //return <h1 className='text-red-500 text-5xl font-bold'>Tailwindcss</h1>
} 

export default App
