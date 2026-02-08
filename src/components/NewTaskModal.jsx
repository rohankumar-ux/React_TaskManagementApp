import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import TaskForm from "./TaskForm";

export default function NewTaskModal({ open, onClose }) {
  const handleSave = (data) => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create New Task</DialogTitle>

      <DialogContent dividers>
        <TaskForm onSave={handleSave} showNavigate={false} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
