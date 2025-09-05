import express from 'express';
import { getAllTasks, createTask, updateTask } from '../services/taskService';
import { generateInsights } from '../services/aiService';

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/insights - Get AI insights
router.get('/insights', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    const insights = await generateInsights(tasks);
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// POST /api/tasks - Create new task (now with AI!)
router.post('/', async (req, res) => {
  try {
    const { title, description, status = 'todo', priority = 'medium', category = '', tags = [] } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = await createTask({
      title,
      description,
      status,
      priority,
      category,
      tags
    });

    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await updateTask(id, updates);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

export default router;