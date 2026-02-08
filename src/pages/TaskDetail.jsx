import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { Card, CardHeader, CardBody, Button, ButtonGroup, Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import TaskForm from '../components/TaskForm';
import { useNotification } from '../hooks/useNotification';
import Notification from '../components/Notification';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask } = useTasks();
  const task = getTaskById(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { notification, showNotification } = useNotification();

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <p className="text-gray-400 text-xl mb-6">Task not found</p>
          <Button color="primary" size="lg" onPress={() => navigate('/tasks')}>
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
    showNotification('Task status updated successfully', 'success');
  };

  const handleUpdateTask = (formData) => {
    updateTask(task.id, formData);
    setIsEditModalOpen(false);
    showNotification('Task updated successfully', 'success');
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      showNotification('Task deleted successfully', 'success');
      navigate('/tasks');
    }
  };

  const getStatusColor = (status) => {
    if (status === 'TO_DO') return 'default';
    if (status === 'IN_PROGRESS') return 'warning';
    if (status === 'DONE') return 'success';
    return 'default';
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Notification message={notification?.message} type={notification?.type} />
      
      <div className="mb-6">
        <Button 
          size="sm" 
          variant="light" 
          onPress={() => navigate('/tasks')}
          className="text-gray-600"
        >
          ← Back to Tasks
        </Button>
      </div>

      <Card className="shadow-sm mb-8">
        <CardHeader className="flex justify-between items-start px-8 py-6 border-b">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{task.title}</h1>
            <p className="text-sm text-gray-500">Created on {formatDate(task.createdAt)}</p>
          </div>
          <StatusBadge status={task.status} />
        </CardHeader>
        
        <CardBody className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {task.description || 'No description provided'}
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Status Management</h3>
            <ButtonGroup size="lg" className="w-full">
              <Button 
                color={getStatusColor('TO_DO')}
                variant={task.status === 'TO_DO' ? 'solid' : 'bordered'}
                onPress={() => handleStatusChange('TO_DO')}
                className="flex-1"
              >
                To Do
              </Button>
              <Button 
                color={getStatusColor('IN_PROGRESS')}
                variant={task.status === 'IN_PROGRESS' ? 'solid' : 'bordered'}
                onPress={() => handleStatusChange('IN_PROGRESS')}
                className="flex-1"
              >
                In Progress
              </Button>
              <Button 
                color={getStatusColor('DONE')}
                variant={task.status === 'DONE' ? 'solid' : 'bordered'}
                onPress={() => handleStatusChange('DONE')}
                className="flex-1"
              >
                Done
              </Button>
            </ButtonGroup>
          </div>

          <div className="flex gap-3 border-t pt-6">
            <Button 
              color="primary" 
              size="lg"
              onPress={() => setIsEditModalOpen(true)}
              className="flex-1"
            >
              Edit Task
            </Button>
            <Button 
              color="danger" 
              variant="bordered"
              size="lg"
              onPress={handleDeleteTask}
              className="flex-1"
            >
              Delete Task
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="text-2xl">Edit Task</ModalHeader>
          <ModalBody className="pb-6">
            <TaskForm 
              task={task}
              onSubmit={handleUpdateTask}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TaskDetail;