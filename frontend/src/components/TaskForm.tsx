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
  Alert,
  Row,
  Col
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
    <Card className="mb-4 shadow border-0">
      <CardHeader 
        className="text-white border-0"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem'
        }}
      >
        <div className="d-flex align-items-center">
          <span className="me-3" style={{ fontSize: '1.5rem' }}>✨</span>
          <div>
            <h4 className="mb-1 text-white fw-bold">Add New Task</h4>
            <p className="mb-0 text-white-50 small">
              AI will automatically analyze and categorize your task
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardBody className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
        {error && (
          <Alert color="danger" className="mb-4 border-0 shadow-sm">
            <div className="d-flex align-items-center">
              <span className="me-2">⚠️</span>
              <strong>{error}</strong>
            </div>
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="12" className="mb-3">
              <Label for="title" className="form-label fw-bold text-dark mb-2">
                Task Title <span className="text-danger">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Fix login bug on mobile Safari"
                disabled={loading}
                className="form-control-lg border-0 shadow-sm"
                style={{
                  fontSize: '1rem',
                  padding: '0.875rem 1.25rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem'
                }}
              />
            </Col>
            
            <Col md="12" className="mb-4">
              <Label for="description" className="form-label fw-bold text-dark mb-2">
                Description <span className="text-danger">*</span>
              </Label>
              <Input
                id="description"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the task in detail... The more detail you provide, the better the AI analysis will be."
                rows="4"
                disabled={loading}
                className="border-0 shadow-sm"
                style={{
                  fontSize: '0.95rem',
                  resize: 'vertical',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1.25rem'
                }}
              />
            </Col>
            
            <Col md="12">
              <Button 
                type="submit" 
                disabled={loading || !title.trim() || !description.trim()}
                className="w-100 border-0 shadow"
                size="lg"
                style={{
                  background: loading 
                    ? 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '0.875rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Creating & Analyzing...
                  </>
                ) : (
                  <>
                    <span className="me-2">🤖</span>
                    Create Task with AI Analysis
                  </>
                )}
              </Button>
            </Col>
          </Row>
        </Form>
        
        {!loading && (
          <div className="mt-4 p-3 bg-white rounded-3 border-0 shadow-sm">
            <div className="d-flex align-items-start">
              <span className="me-2 mt-1" style={{ fontSize: '1.1rem' }}>💡</span>
              <div>
                <strong className="text-dark">Tip:</strong>
                <span className="text-muted ms-1">
                  Include specific details like browser names, error messages, or technical requirements for better AI analysis.
                </span>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};