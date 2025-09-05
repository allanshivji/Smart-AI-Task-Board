import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';

interface TaskFormProps {
  onTaskCreated: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and description');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        onTaskCreated();
      } else {
        setError('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Error creating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <h5 className="mb-0">
          ➕ Add New Task
        </h5>
      </CardHeader>
      <CardBody>
        {error && (
          <Alert color="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Task Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Fix login bug"
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task in detail..."
              rows="3"
              disabled={loading}
            />
          </FormGroup>
          
          <Button 
            type="submit" 
            color="primary"
            disabled={loading}
            block
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Creating...
              </>
            ) : (
              'Create Task'
            )}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};