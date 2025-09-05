export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: string;
  estimatedHours?: number;
  tags: string[];
  aiAnalysis?: {
    category: string;
    priority: 'low' | 'medium' | 'high';
    estimatedHours: number;
    reasoning: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TasksData {
  tasks: Task[];
  lastId: number;
}