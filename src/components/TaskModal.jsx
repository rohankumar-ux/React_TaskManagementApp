import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import TaskForm from "./TaskForm";

export default function TaskModal({ open, onClose, task, onSave }) {
  const isEditing = !!task;

  const handleSave = (data) => {
    onSave?.(data);
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
        />
      </DialogContent>
    </Dialog>
  );
}