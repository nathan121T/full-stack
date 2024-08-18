import  { Router } from 'express';
const router = Router();
import { addTask, getTasks, updateTask,  deleteTask } from '../controllers/taskController.js';

router.post('/api/tasks', addTask)
router.get('/api/tasks', getTasks)
router.put('/api/tasks/:id', updateTask)
router.delete('/api/tasks/:id', deleteTask)
export default router;
