import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { TaskProvider } from './context/TaskContext';
import Navigation from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <HeroUIProvider>
      <TaskProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </HeroUIProvider>
  );
}

export default App;