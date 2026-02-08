import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Stack } from "@mui/material";
import { useState, useEffect } from "react";

export default function EditTaskModal({ open, onClose, task, onSave }) {
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (task) {
      setForm({ title: task.title, description: task.description || "" });
    }
  }, [task, open]);

  const handleSave = () => {
    const data = { title: form.title, description: form.description };
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            fullWidth
            required
            autoFocus
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
