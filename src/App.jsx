import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import TaskList from './components/Task/TaskList'
import TaskForm from './components/Task/TaskForm'
import TaskStats from './components/Task/TaskStats'


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
  const total = tasks.length
  const remaining = tasks.filter( (task) => !task.completed).length
  const completed = total-remaining;

  /* used for filter buttons useState*/const [Filter,setFilter] = useState("all");
  let filteredTask =  tasks;
  if(Filter === 'active'){
    filteredTask= tasks.filter( (task) => !task.completed)
  }
  if (Filter === 'completed') {
    filteredTask = tasks.filter((task) => task.completed)
  }
  return <>
    <div className=' w-screen min-h-screen flex flex-col items-center justify-center'>
        <div className=' bg-white p-6 pt-8 pb-7 rounded-lg shadow-lg w-96  '>
          <Header/>
          <TaskForm addTask={addTask}/>
          <TaskList tasks={filteredTask} 
          deleTask ={deleTask}
          toggleTask={toggleTask}
          />
          <TaskStats 
          total = {total}
          remaining={remaining}
          completed={completed}
          />

          {/* filter buttons*/}
          <div className='flex justify-around mt-3 '>
            <button onClick={() => setFilter("all")} >All</button>
            <button onClick={() => setFilter("active")}>Filter</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div> 
        </div>

    </div>
  </>
  //return <h1 className='text-red-500 text-5xl font-bold'>Tailwindcss</h1>
} 

export default App
