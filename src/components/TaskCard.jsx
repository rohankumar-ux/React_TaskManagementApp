import { Card, CardHeader, CardBody, CardFooter, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task, onDelete, onStatusChange, showNotification }) => {
  const navigate = useNavigate();
  const { updateTask } = useTasks();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleMenuAction = (key) => {
    if (key === 'view') {
      navigate(`/tasks/${task.id}`);
    } else if (key === 'delete') {
      if (window.confirm('Are you sure you want to delete this task?')) {
        onDelete(task.id);
      }
    }
  };

  const handleStartTask = () => {
    updateTask(task.id, { status: 'IN_PROGRESS' });
    if (onStatusChange) onStatusChange();
    if (showNotification) {
      showNotification('Task status updated to In Progress', 'success');
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex justify-between items-start px-5 pt-5 pb-3">
        <div className="flex-1 pr-2">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light" className="min-w-unit-8 w-8 h-8">
              <span className="text-xl">⋮</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Task actions" onAction={handleMenuAction}>
            <DropdownItem key="view">View Details</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete Task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      
      <CardBody className="px-5 py-4 flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3">
          {task.description || 'No description provided'}
        </p>
      </CardBody>
      
      <CardFooter className="px-5 pb-5 pt-3 flex justify-between items-center border-t">
        <p className="text-xs text-gray-400">{formatDate(task.createdAt)}</p>
        {task.status === 'TO_DO' && (
          <Button color="primary" size="sm" variant="flat" onPress={handleStartTask}>
            Start Task
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;