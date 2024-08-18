import { FaTrashAlt,FaEdit} from 'react-icons/fa';
const TaskItem = ({ task, handleCheck, handleEdit, deleteTask}) => {
 
  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <li 
     className={`task ${task.completed ? 'completed' : ''}`}
     onDoubleClick={( )=> handleCheck(task._id)}
    >
      <div className="task-content">
      <span className="check-box">
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={()=> handleCheck(task._id)}
          />
      </span>
         <p>
         {capitalizeFirstLetter(task.text)}
        </p>

      </div>
        
      <div className="btns-icons">
        <FaEdit
            className='edit-btn'
            onClick={() => handleEdit(task)}
        />
        <FaTrashAlt
            className='delete-btn' 
            onClick={() => deleteTask(task._id)}
        />
    </div>
    </li>
  )
}

export default TaskItem;
