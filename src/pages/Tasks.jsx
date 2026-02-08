import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Button, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useNotification } from '../hooks/useNotification';
import Notification from '../components/Notification';

const Tasks = () => {
  const { tasks, addTask, deleteTask } = useTasks();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification, showNotification } = useNotification();

  const filterTasks = () => {
    if (selectedFilter === 'all') return tasks;
    return tasks.filter(task => {
      if (selectedFilter === 'todo') return task.status === 'TO_DO';
      if (selectedFilter === 'in-progress') return task.status === 'IN_PROGRESS';
      if (selectedFilter === 'done') return task.status === 'DONE';
      return true;
    });
  };

  const handleCreateTask = (formData) => {
    addTask(formData);
    setIsModalOpen(false);
    showNotification('Task created successfully', 'success');
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    showNotification('Task deleted successfully', 'success');
  };

  const filteredTasks = filterTasks();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Notification message={notification?.message} type={notification?.type} />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button color="primary" size="lg" onPress={() => setIsModalOpen(true)}>
          + Create New Task
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <Tabs 
          selectedKey={selectedFilter} 
          onSelectionChange={setSelectedFilter}
          variant="underlined"
          color="primary"
          size="lg"
        >
          <Tab key="all" title="All Tasks" />
          <Tab key="todo" title="To Do" />
          <Tab key="in-progress" title="In Progress" />
          <Tab key="done" title="Done" />
        </Tabs>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <p className="text-gray-400 text-xl mb-4">No tasks found</p>
          <Button color="primary" onPress={() => setIsModalOpen(true)}>
            Create Your First Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={handleDeleteTask}
              showNotification={showNotification}
            />
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        size="2xl"
        backdrop="blur"
        isDismissable={true}
        isKeyboardDismissDisabled={false}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="text-2xl">Create New Task</ModalHeader>
          <ModalBody className="pb-6">
            <TaskForm 
              onSubmit={handleCreateTask}
              onCancel={() => setIsModalOpen(false)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Tasks;