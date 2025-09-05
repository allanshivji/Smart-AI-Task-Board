import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Alert,
  Spinner,
  Button
} from 'reactstrap';

export const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/tasks/insights');
      
      if (!response.ok) {
        throw new Error('Failed to fetch insights');
      }
      
      const data = await response.json();
      setInsights(data.insights);
    } catch (err) {
      setError('Failed to load AI insights');
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <Card className="mb-4">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">🤖 AI Insights</h5>
        <Button 
          color="outline-primary" 
          size="sm"
          onClick={fetchInsights}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : '🔄 Refresh'}
        </Button>
      </CardHeader>
      <CardBody>
        {loading && (
          <div className="text-center py-3">
            <Spinner color="primary" />
            <p className="mt-2 mb-0">Generating AI insights...</p>
          </div>
        )}
        
        {error && (
          <Alert color="warning">
            {error}
          </Alert>
        )}
        
        {!loading && !error && insights.length > 0 && (
          <div>
            {insights.map((insight, index) => (
              <Alert key={index} color="info" className="mb-2">
                <strong>💡</strong> {insight}
              </Alert>
            ))}
          </div>
        )}
        
        {!loading && !error && insights.length === 0 && (
          <p className="text-muted mb-0">
            No insights available. Create some tasks to get AI analysis!
          </p>
        )}
      </CardBody>
    </Card>
  );
};