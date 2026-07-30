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
            ...task,completed:!task.completed
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
    <Header/>
    <TaskForm addTask={addTask}/>
    <TaskList tasks={tasks}  deleTask ={deleTask} toggleTask={toggleTask}/>
  </>
}

export default App
