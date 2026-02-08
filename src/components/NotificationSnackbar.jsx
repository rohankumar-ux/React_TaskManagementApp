import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useTaskContext } from '../context/TaskContext';

const NotificationSnackbar = () => {
  const { notification, closeNotification } = useTaskContext();

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={closeNotification}
        severity={notification.severity}
        variant="filled"
        sx={{
          width: '100%',
          borderRadius: '12px',
          fontWeight: 600,
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;