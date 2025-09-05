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
    tags: string[];  // ← Add this line
  };
  createdAt: string;
  updatedAt: string;
}