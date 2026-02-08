import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar 
      maxWidth="full" 
      className="bg-white border-b border-gray-200 py-2"
      height="72px"
    >
      <NavbarBrand className="gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              TaskFlow
            </p>
            <p className="text-xs text-gray-500">Task Management</p>
          </div>
        </div>
      </NavbarBrand>
      
      <NavbarContent className="gap-1" justify="center">
        <NavbarItem>
          <Link 
            href="/dashboard"
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isActive('/dashboard') 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            href="/tasks"
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isActive('/tasks') 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Tasks
          </Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@taskflow.com</p>
                </div>
                <Avatar 
                  name="Admin" 
                  size="md"
                  className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold"
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">admin@taskflow.com</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="help">Help & Support</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;