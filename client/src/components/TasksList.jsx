
import TaskItem from './TaskItem'

const TasksList = ({ tasks,handleCheck, handleEdit, deleteTask}) => {

  return (

    <ul className='tasks'>
      {tasks.map(task => (
        <TaskItem 
           key={task._id} 
           task={task} 
           handleCheck={handleCheck}
           handleEdit={handleEdit}
           deleteTask={deleteTask} 
        />
      ))}
    </ul>
  )
}

export default TasksList
