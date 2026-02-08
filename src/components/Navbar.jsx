import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ minHeight: 72 }}>
        <Box>
          <Typography variant="h6">TaskFlow</Typography>
          <Typography variant="caption" color="text.secondary">
            Task Management
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Button
            component={RouterLink}
            to="/dashboard"
            variant={isActive('/dashboard') ? 'contained' : 'text'}
          >
            Dashboard
          </Button>

          <Button
            component={RouterLink}
            to="/tasks"
            variant={isActive('/tasks') ? 'contained' : 'text'}
          >
            Tasks
          </Button>
        </Box>

        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
        >
          <Avatar>A</Avatar>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem disabled>admin@taskflow.com</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help & Support</MenuItem>
          <MenuItem sx={{ color: 'error.main' }}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
