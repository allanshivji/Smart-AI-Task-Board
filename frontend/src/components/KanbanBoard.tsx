import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardBody, CardHeader, Badge, Row, Col } from 'reactstrap';
import { Task } from '../types/Task';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskUpdate }) => {
  const columns = {
    todo: { title: '📋 To Do', color: 'primary' },
    doing: { title: '⚡ In Progress', color: 'info' },
    done: { title: '✅ Done', color: 'success' }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getTagColor = (tag: string): string => {
    switch (tag.toLowerCase()) {
      case 'javascript': return '#f7df1e';
      case 'react': return '#61dafb';
      case 'node': return '#68a063';
      case 'typescript': return '#3178c6';
      case 'database': return '#336791';
      case 'api': return '#ff6b6b';
      case 'frontend': return '#61dafb';
      case 'backend': return '#68a063';
      case 'mobile': return '#4dabf7';
      case 'authentication': return '#fd7e14';
      case 'testing': return '#20c997';
      case 'deployment': return '#6f42c1';
      case 'security': return '#dc3545';
      case 'performance': return '#fd7e14';
      case 'ui': return '#e83e8c';
      case 'design': return '#e83e8c';
      case 'bug': return '#dc3545';
      case 'feature': return '#28a745';
      case 'safari': return '#1976d2';
      case 'chrome': return '#4285f4';
      case 'ios': return '#007aff';
      case 'android': return '#3ddc84';
      case 'css': return '#1572b6';
      case 'html': return '#e34f26';
      case 'login': return '#fd7e14';
      case 'auth': return '#fd7e14';
      case 'form': return '#17a2b8';
      case 'button': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as 'todo' | 'doing' | 'done';
    
    const task = tasks.find(t => t.id === draggableId);
    if (task && task.status !== newStatus) {
      onTaskUpdate(draggableId, { status: newStatus });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row>
        {Object.entries(columns).map(([status, column]) => {
          const columnTasks = getTasksByStatus(status);
          
          return (
            <Col md="4" key={status}>
              <Card className="mb-4 h-100 shadow-sm">
                <CardHeader 
                  className="text-white"
                  style={{
                    background: column.color === 'primary' 
                      ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
                      : column.color === 'info'
                      ? 'linear-gradient(135deg, #17a2b8 0%, #117a8b 100%)'
                      : 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                    border: 'none'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-white">{column.title}</h5>
                    <span 
                      className="badge rounded-pill"
                      style={{
                        backgroundColor: status === 'todo' ? '#fff' : status === 'doing' ? '#fff3cd' : '#d1e7dd',
                        color: status === 'todo' ? '#0056b3' : status === 'doing' ? '#664d03' : '#0f5132',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '0.5em 0.75em',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        minWidth: '2rem',
                        textAlign: 'center'
                      }}
                    >
                      {columnTasks.length}
                    </span>
                  </div>
                </CardHeader>
                <CardBody style={{ minHeight: '500px', padding: '1rem' }}>
                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: snapshot.isDraggingOver ? '#f8f9fa' : 'transparent',
                          minHeight: '400px',
                          padding: '8px',
                          borderRadius: '8px',
                          border: snapshot.isDraggingOver ? '2px dashed #007bff' : '2px dashed transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {columnTasks.length === 0 ? (
                          <div className="text-center text-muted py-5">
                            <div style={{ fontSize: '3rem', opacity: 0.3 }}>
                              {status === 'todo' ? '📝' : status === 'doing' ? '⚡' : '🎉'}
                            </div>
                            <p className="mt-2">
                              {snapshot.isDraggingOver ? 'Drop task here!' : 'No tasks yet'}
                            </p>
                            {status === 'todo' && !snapshot.isDraggingOver && (
                              <small>Create a task above or drag one here!</small>
                            )}
                          </div>
                        ) : (
                          columnTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    transform: snapshot.isDragging 
                                      ? `${provided.draggableProps.style?.transform} rotate(5deg)`
                                      : provided.draggableProps.style?.transform
                                  }}
                                >
                                  <Card 
                                    className={`mb-3 border-start border-4 ${snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'}`}
                                    style={{ 
                                      borderLeftColor: `var(--bs-${getPriorityColor(task.priority)})`,
                                      opacity: snapshot.isDragging ? 0.9 : 1,
                                      transition: 'all 0.2s ease',
                                      cursor: 'grab'
                                    }}
                                  >
                                    <CardBody className="p-3">
                                      <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="mb-0 fw-bold" style={{ fontSize: '0.95rem', lineHeight: '1.3' }}>
                                          {snapshot.isDragging ? '🎯 ' : ''}{task.title}
                                        </h6>
                                        <Badge color={getPriorityColor(task.priority)} pill size="sm" className="ms-2">
                                          {task.priority}
                                        </Badge>
                                      </div>
                                      
                                      <p className="text-muted small mb-3" style={{ 
                                        fontSize: '0.85rem', 
                                        lineHeight: '1.4'
                                      }}>
                                        {task.description.length > 80 
                                          ? `${task.description.substring(0, 80)}...`
                                          : task.description
                                        }
                                      </p>
                                      
                                      {task.aiAnalysis && (
                                        <div className="mb-3">
                                          <div className="d-flex flex-wrap gap-1 mb-2">
                                            <Badge color="info" size="sm" className="fw-semibold">
                                              📁 {task.aiAnalysis.category}
                                            </Badge>
                                            <Badge color="secondary" size="sm">
                                              ⏱️ ~{task.aiAnalysis.estimatedHours}h
                                            </Badge>
                                          </div>
                                          
                                          {task.aiAnalysis.tags && task.aiAnalysis.tags.length > 0 && (
                                            <div className="d-flex flex-wrap gap-1">
                                              {task.aiAnalysis.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <Badge 
                                                  key={tagIndex} 
                                                  size="sm"
                                                  className="text-white fw-medium"
                                                  style={{
                                                    backgroundColor: getTagColor(tag),
                                                    fontSize: '0.7rem',
                                                    padding: '0.25em 0.5em'
                                                  }}
                                                >
                                                  {tag}
                                                </Badge>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      
                                      <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">
                                          {new Date(task.createdAt).toLocaleDateString()}
                                        </small>
                                        <small className="text-primary">
                                          🎯 Drag to move
                                        </small>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                        
                        {/* Drop zone indicator */}
                        {snapshot.isDraggingOver && columnTasks.length > 0 && (
                          <div className="text-center text-primary py-3 border-top border-2 border-primary">
                            <small>📍 Drop here to move task</small>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </DragDropContext>
  );
};