import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import TaskForm from "./TaskForm";

export default function TaskModal({ open, onClose, task, onSave }) {
  const isEditing = task != null;

  const handleSave = (data) => {
    if (onSave) {
      onSave(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit Task" : "Create New Task"}</DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <TaskForm 
          task={task} 
          onSave={handleSave} 
          showNavigate={false}
          showSubmitButton={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}