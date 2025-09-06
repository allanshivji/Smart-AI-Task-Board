import { useState, useEffect } from 'react';
import { Container, Alert, Spinner, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { KanbanBoard } from './components/KanbanBoard';
import { AIInsights } from './components/AIInsights';
import { Task } from './types/Task';
import { api } from './services/api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'kanban' | 'list'>('kanban');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data.tasks);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    try {
      await api.updateTask(taskId, updates);
      await fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
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
    <Container fluid className="py-4">
      <div className="text-center mb-4">
        <h1 className="display-4">🤖 Smart Task Board</h1>
        <p className="lead text-muted">
          AI-powered task management with intelligent insights
        </p>
      </div>

      <Container>
        <TaskForm onTaskCreated={fetchTasks} />
        <AIInsights />
        
        {/* View Toggle */}
        <Nav pills className="mb-4">
          <NavItem>
            <NavLink 
              active={activeView === 'kanban'}
              onClick={() => setActiveView('kanban')}
              style={{ cursor: 'pointer' }}
            >
              🔄 Kanban Board
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              active={activeView === 'list'}
              onClick={() => setActiveView('list')}
              style={{ cursor: 'pointer' }}
            >
              📋 List View
            </NavLink>
          </NavItem>
        </Nav>

        {/* Dynamic View */}
        {activeView === 'kanban' ? (
          <KanbanBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} />
        ) : (
          <TaskList tasks={tasks} />
        )}
      </Container>
    </Container>
  );
}

export default App;