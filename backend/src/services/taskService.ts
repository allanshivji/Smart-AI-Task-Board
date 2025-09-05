import fs from 'fs/promises';
import path from 'path';
import { Task, TasksData } from '../types/Task';
import { analyzeTask } from './aiService';

const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    
    if (!data.trim()) {
      console.log('Tasks file is empty, initializing...');
      await initializeTasksFile();
      return [];
    }
    
    const tasksData: TasksData = JSON.parse(data);
    return tasksData.tasks;
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') {
      console.log('Tasks file not found, creating...');
      await initializeTasksFile();
      return [];
    }
    
    console.error('Error reading tasks:', error);
    return [];
  }
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  try {
    console.log('🤖 Analyzing task with AI...');
    
    // Get AI analysis
    const aiAnalysis = await analyzeTask(taskData.title, taskData.description);
    
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    const tasksData: TasksData = JSON.parse(data);
    
    const newTask: Task = {
      ...taskData,
      id: String(tasksData.lastId + 1),
      // Use AI suggestions as defaults, but keep user input if provided
      category: taskData.category || aiAnalysis.category,
      priority: taskData.priority || aiAnalysis.priority,
      estimatedHours: taskData.estimatedHours || aiAnalysis.estimatedHours,
      tags: taskData.tags.length > 0 ? taskData.tags : aiAnalysis.tags,
      aiAnalysis: aiAnalysis,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasksData.tasks.push(newTask);
    tasksData.lastId += 1;

    await fs.writeFile(TASKS_FILE, JSON.stringify(tasksData, null, 2));
    
    console.log('✅ Task created with AI analysis:', aiAnalysis);
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

// Helper function to create initial file
const initializeTasksFile = async (): Promise<void> => {
  const initialData: TasksData = {
    tasks: [],
    lastId: 0
  };
  
  await fs.mkdir(path.dirname(TASKS_FILE), { recursive: true });
  await fs.writeFile(TASKS_FILE, JSON.stringify(initialData, null, 2));
  console.log('Initialized tasks.json file');
};

// Keep updateTask function the same...
export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task | null> => {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    const tasksData: TasksData = JSON.parse(data);
    
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    tasksData.tasks[taskIndex] = {
      ...tasksData.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await fs.writeFile(TASKS_FILE, JSON.stringify(tasksData, null, 2));
    return tasksData.tasks[taskIndex];
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
};