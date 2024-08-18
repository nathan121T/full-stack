import { useState, useEffect } from 'react'
import axios from 'axios'
import AddTask from './components/AddTaskItem'
import TasksList from './components/TasksList'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() =>{
    // fetch tasks
    const getAllTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3030/api/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.log('Fetching tasks err:', err.message);
      setError(err.message);
      setLoading(false);
    }
  };
   getAllTasks();
   }, [])

  
  const handleEdit = (task) => {
    setEditTask(task);
  };

  // Add Task
  const addTask = async (text) => {
    try {
      const res = await axios.post('http://localhost:3030/api/tasks/', { text });
      setTasks(prevTasks => [res.data, ...prevTasks]);
    } catch (err) {
      console.log('Adding task err:', err.message);
    }
  };
  

  // handle check
 const handleCheck = (id) =>{
   const listTask = tasks.map(task =>task._id === id ? {
     ...task, completed: ! task.completed}: task);
     setTasks(listTask)
 }
  // update tasks
  const updateTask = async (id, task) => {
    try {
      const response = await axios.put(`http://localhost:3030/api/tasks/${id}`, { text: task });
      setEditTask(null);
      setTasks(tasks.map(task => (task._id === editTask._id ? response.data : task)));
    } catch (err) {
      console.log('Updating task err:', err.message);
    }
  }

  const handleSubmit =(task) =>{
    if (editTask) {
      updateTask(editTask._id, task);
      setEditTask(null);
    } else {
      addTask(task);
    }
  }

    // Delete Task
    const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await axios.delete(`http://localhost:3030/api/tasks/${id}`);
          setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
          console.log('Deleting task err:', err.message);
        }
      };
      }

  return (
    <div className='container'>
        <AddTask 
          handleSubmit = {handleSubmit}
         editTask = {editTask}
         />

        <div className="underline"></div>
        {loading ? (
        <p className='loading'>Loading...</p>
      ) : error ? (
        <p className='error'>{error}</p>
      ) : tasks.length > 0 ? (
        <TasksList
          tasks={tasks}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
          deleteTask={handleDelete}
        />
      ) : (
        <p className='empty-task'>Your Task is Empty.</p>
      )}
      </div>
  )
}

export default App;
