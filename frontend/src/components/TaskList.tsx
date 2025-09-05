import React from 'react';
import {
  Card,
  CardBody,
  Badge,
  Row,
  Col,
  Collapse
} from 'reactstrap';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [expandedTask, setExpandedTask] = React.useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'todo': return { emoji: '📋', color: 'primary', text: 'To Do' };
      case 'doing': return { emoji: '⚡', color: 'info', text: 'In Progress' };
      case 'done': return { emoji: '✅', color: 'success', text: 'Done' };
      default: return { emoji: '📋', color: 'secondary', text: status };
    }
  };

  const toggleExpand = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  if (tasks.length === 0) {
    return (
      <Card className="text-center">
        <CardBody className="py-5">
          <h4 className="text-muted">No tasks yet!</h4>
          <p className="text-muted">Create your first task above to get started.</p>
          <div style={{ fontSize: '4rem' }}>📝</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      <h4 className="mb-3">📋 Your Tasks ({tasks.length})</h4>
      <Row>
        {tasks.map((task) => {
          const statusInfo = getStatusInfo(task.status);
          const isExpanded = expandedTask === task.id;
          
          return (
            <Col md="6" lg="4" key={task.id} className="mb-3">
              <Card className="h-100 shadow-sm">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">
                      {statusInfo.emoji} {task.title}
                    </h6>
                    <Badge color={getPriorityColor(task.priority)} pill>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <p className="card-text text-muted small mb-3">
                    {task.description}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge color={statusInfo.color} outline>
                      {statusInfo.text}
                    </Badge>
                    <small className="text-muted">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  
                  {/* AI Analysis Section */}
                  {task.aiAnalysis && (
                    <div className="mt-3 pt-2 border-top">
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-primary">🤖 AI Analysis</small>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => toggleExpand(task.id)}
                        >
                          {isExpanded ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      
                      <Collapse isOpen={isExpanded}>
                        <div className="mt-2">
                          <div className="mb-2">
                            <Badge color="info" className="me-1">
                              {task.aiAnalysis.category}
                            </Badge>
                            <Badge color="secondary" className="me-1">
                              ~{task.aiAnalysis.estimatedHours}h
                            </Badge>
                          </div>
                          
                          {task.aiAnalysis.tags && (
                            <div className="mb-2">
                              {task.aiAnalysis.tags.map((tag, index) => (
                                <Badge key={index} color="light" className="me-1 mb-1">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <small className="text-muted d-block">
                            <strong>AI Reasoning:</strong> {task.aiAnalysis.reasoning}
                          </small>
                        </div>
                      </Collapse>
                    </div>
                  )}
                  
                  {task.category && !task.aiAnalysis && (
                    <div className="mt-2">
                      <Badge color="light" className="me-1">
                        {task.category}
                      </Badge>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};