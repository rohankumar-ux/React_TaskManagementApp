import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      title: "Review Q1 marketing proposal",
      description: "Provide feedback by EOD",
      status: "DONE",
      createdAt: "2025-01-28"
    },
    {
      id: uuid(),
      title: "Update user documentation",
      description: "Add new v2.3 features",
      status: "TO_DO",
      createdAt: "2025-02-02"
    },
    {
      id: uuid(),
      title: "Fix login bug",
      description: "Resolve issue with OAuth redirect",
      status: "IN_PROGRESS",
      createdAt: "2025-02-03"
    },
    {
      id: uuid(),
      title: "Prepare sprint demo",
      description: "Slides and live walkthrough",
      status: "TO_DO",
      createdAt: "2025-02-04"
    },
    {
      id: uuid(),
      title: "Refactor dashboard components",
      description: "Improve performance and readability",
      status: "IN_PROGRESS",
      createdAt: "2025-02-01"
    },
    {
      id: uuid(),
      title: "Team retrospective",
      description: "Gather feedback and action items",
      status: "DONE",
      createdAt: "2025-01-31"
    }
  ]);

  const addTask = (task) => {
    const createdAt = task.createdAt || new Date().toISOString().slice(0, 10);
    setTasks(prev => [
      ...prev,
      {
        ...task,
        id: uuid(),
        createdAt
      }
    ]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
