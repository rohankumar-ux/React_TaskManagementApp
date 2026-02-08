import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const PREDEFINED_TASKS = [
  {
    id: '1',
    title: 'Design System Setup',
    description: 'Set up the design system with Tailwind CSS and HeroUI components',
    priority: 'HIGH',
    dueDate: '2026-02-10',
    status: 'IN_PROGRESS',
    createdAt: new Date('2026-02-01').toISOString(),
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Add user login and registration functionality',
    priority: 'HIGH',
    dueDate: '2026-02-15',
    status: 'TO_DO',
    createdAt: new Date('2026-02-01').toISOString(),
  },
  {
    id: '3',
    title: 'Create Task Dashboard',
    description: 'Build the main dashboard with task statistics and overview',
    priority: 'MEDIUM',
    dueDate: '2026-02-08',
    status: 'DONE',
    createdAt: new Date('2026-01-25').toISOString(),
  },
  {
    id: '4',
    title: 'API Integration',
    description: 'Connect frontend with backend API endpoints',
    priority: 'HIGH',
    dueDate: '2026-02-20',
    status: 'TO_DO',
    createdAt: new Date('2026-02-02').toISOString(),
  },
  {
    id: '5',
    title: 'Write Unit Tests',
    description: 'Write unit tests for core components and utilities',
    priority: 'MEDIUM',
    dueDate: '2026-02-25',
    status: 'TO_DO',
    createdAt: new Date('2026-02-02').toISOString(),
  },
];

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review Q1 marketing proposal",
      description: "Provide feedback by EOD",
      status: "DONE",
      createdAt: "2025-01-28"
    },
    {
      id: 2,
      title: "Update user documentation",
      description: "Add new v2.3 features",
      status: "TO_DO",
      createdAt: "2025-02-02"
    }
  ]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      status: 'TO_DO',
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTaskById = (id) => {
    return tasks.find(task => task.id === id);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getTaskCounts = () => {
    return {
      total: tasks.length,
      toDo: tasks.filter(t => t.status === 'TO_DO').length,
      inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      done: tasks.filter(t => t.status === 'DONE').length,
    };
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
      getTasksByStatus,
      getTaskCounts,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
