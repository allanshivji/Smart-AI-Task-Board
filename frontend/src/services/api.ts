const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Get all tasks
  getTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // Create new task
  createTask: async (taskData: {
    title: string;
    description: string;
    status?: string;
    priority?: string;
    category?: string;
    tags?: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  // Update task
  updateTask: async (id: string, updates: any) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  // Get AI insights
  getInsights: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks/insights`);
    if (!response.ok) {
      throw new Error('Failed to fetch insights');
    }
    return response.json();
  }
};