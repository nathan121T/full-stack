import Task from "../models/taskModel.js";

// Add a new task
export const addTask = async (req, res) => {
    const { text } = req.body;
  
    try {
      const newTask = await Task.create({text});
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.send(tasks);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};

// Update a task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { text }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).send('Successfully deleted task');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};


