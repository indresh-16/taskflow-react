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
  function deleTask(TasktoDelete){
    setTasks(
      tasks.filter((task) => task !== TasktoDelete)
    )
  }
  function toggleTask(clickedtask){
    setTasks(
      tasks.map((task) => {
        if(task.text === clickedtask.text){
          return {
            ...task,completed:!task.completed
          };
        }
        return task
      })
    )
  }
  return <>
    <Header/>
    <TaskForm addTask={addTask}/>
    <TaskList tasks={tasks}  deleTask ={deleTask} toggleTask={toggleTask}/>
  </>
}

export default App
