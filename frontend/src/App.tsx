import React, { useState, useEffect } from 'react';
import { Container, Alert, Spinner, Button, Badge } from 'reactstrap';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Task } from './types/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data.tasks);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <h4 className="mt-3">Loading tasks...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert color="danger" className="text-center">
          <h4>❌ Error</h4>
          <p>{error}</p>
          <Button color="primary" onClick={fetchTasks}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1 className="display-4">🤖 Smart Task Board</h1>
        <p className="lead text-muted">
          AI-powered task management <Badge color="secondary">AI features coming soon!</Badge>
        </p>
      </div>

      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} />
    </Container>
  );
}

export default App;