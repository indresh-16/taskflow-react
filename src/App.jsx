import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import TaskList from './components/Task/TaskList'
import TaskForm from './components/Task/TaskForm'


function App({inputValue}) {
  const [tasks,setTasks] = useState([]);
  function addTask(inputValue){
     setTasks([...tasks,inputValue])
  }

  return <>
    <Header/>
    <TaskForm addTask={addTask}/>
    <TaskList tasks={tasks}/>
  </>
}

export default App
