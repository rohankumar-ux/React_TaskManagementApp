import { useTasks } from '../context/TaskContext';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

const Dashboard = () => {
  const { getTaskCounts, getTasksByStatus } = useTasks();
  const navigate = useNavigate();
  const counts = getTaskCounts();
  const upcomingTasks = getTasksByStatus('TO_DO').slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Tasks" count={counts.total} color="default" />
        <StatCard title="To Do" count={counts.toDo} color="primary" />
        <StatCard title="In Progress" count={counts.inProgress} color="warning" />
        <StatCard title="Completed" count={counts.done} color="success" />
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
          <Button 
            size="sm" 
            color="primary" 
            variant="flat"
            onPress={() => navigate('/tasks')}
          >
            View All Tasks
          </Button>
        </CardHeader>
        <CardBody className="p-6">
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No upcoming tasks</p>
              <Button 
                color="primary" 
                className="mt-4"
                onPress={() => navigate('/tasks')}
              >
                Create Your First Task
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                <div 
                  key={task.id} 
                  className="p-5 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <StatusBadge status={task.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {task.description || 'No description'}
                  </p>
                  <p className="text-xs text-gray-400">Created: {formatDate(task.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;