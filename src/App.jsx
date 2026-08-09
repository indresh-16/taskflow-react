import { useState ,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import './App.css'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks';
import Login from './pages/Login';


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

  /* used for filter buttons useState*/
  const [Filter,setFilter] = useState("all");
  let filteredTask =  tasks;
  if(Filter === 'active'){
    filteredTask= tasks.filter( (task) => !task.completed)
  }
  if (Filter === 'completed') {
    filteredTask = tasks.filter((task) => task.completed)
    
  }
/*const [loaded, setLoaded] = useState(false);*/
useEffect(() => {
  const storedValue = localStorage.getItem("tasks")
  console.log("stored",storedValue);
  const parseTask = JSON.parse(storedValue || "[]")
  setTasks(parseTask)
  console.log("parsed",parseTask)
},[])

useEffect( () => {
  if (tasks.length > 0) {
      localStorage.setItem("tasks",JSON.stringify(tasks));
  }
},[tasks])

  return (
    <BrowserRouter>
        <Routes>
              <Route
                path='/login'
                element={<Login/>}
              />
            <Route path="/" element={<Dashboard />} />

            <Route
                path="/tasks"
                element={
                    <Tasks
                        addTask={addTask}
                        tasks={tasks}
                        filteredTask={filteredTask}
                        deleTask={deleTask}
                        toggleTask={toggleTask}
                        filter={Filter}
                        setFilter={setFilter}
                    />
                }
              />

        </Routes>
    </BrowserRouter>
  );
  //return <h1 className='text-red-500 text-5xl font-bold'>Tailwindcss</h1>

} 

export default App
