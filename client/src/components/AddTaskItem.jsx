import { useState,useEffect, useRef } from 'react'


const AddTaskItem = ({ handleSubmit, editTask }) => {

  const [inputText, setInputText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (editTask) {
      setInputText(editTask.text);
    } else {
      setInputText('');
    }
  }, [editTask]);

  
  const Submit = async (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleSubmit(inputText);
      setInputText('');
    } else {
      alert('Task text is required');
    }
  };

  return (
    <form className='add-form' onSubmit={Submit}>
       <h2>Task Management</h2>
      <div className='form-control'>
        <input
          type='text'
          ref={inputRef}
          placeholder='Write Your Task...'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
         type='submit'
         onClick={()=> inputRef.current.focus()} 
         className='btn add-btn'>{editTask ? 'Update' : 'Add Task'}</button>
      </div>
    </form>
    
  )
}

export default AddTaskItem;
