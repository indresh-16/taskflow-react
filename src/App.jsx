import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import TaskList from './components/Task/TaskList'
import TaskForm from './components/Task/TaskForm'


function App() {
  const [tasks,setTasks] = useState([]);
  function addTask(inputValue){
     setTasks([...tasks,inputValue])
  }
  function deleTask(TasktoDelete){
    setTasks(
      tasks.filter((task) => task !== TasktoDelete)
    )
  }
  return <>
    <Header/>
    <TaskForm addTask={addTask}/>
    <TaskList tasks={tasks}  deleTask ={deleTask}/>
  </>
}

export default App
