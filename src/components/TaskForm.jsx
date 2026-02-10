import { Box, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useState, useEffect } from "react";

export default function TaskForm({ 
  task, 
  onSave, 
  showNavigate = true,
  showSubmitButton = true 
}) {
  const { addTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });

  const isEditing = task != null;

  useEffect(() => {
    if (task) {
      setForm({ 
        title: task.title || "", 
        description: task.description || "" 
      });
    } else {
      setForm({ title: "", description: "" });
    }
  }, [task]);

  const handleSubmit = () => {
    
    if (!form.title.trim()) {
      return;
    }

    const data = { 
      title: form.title.trim(), 
      description: form.description.trim() 
    };

    if (isEditing) {
      updateTask({
        ...task,
        ...data
      });
    } else {
      addTask({
        ...data,
        status: "TO_DO",
        createdAt: new Date().toISOString().split("T")[0]
      });
    }

    if (onSave) {
      onSave(data);
    }

    if (showNavigate && !onSave) {
      navigate("/tasks");
    }

    if (!isEditing && !onSave) {
      setForm({ title: "", description: "" });
    }
  };

  return (
    <Box p={showSubmitButton ? 0 : 3}>
      <form onSubmit={handleSubmit}>
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
          {showSubmitButton && (
            <Button type="submit" variant="contained" fullWidth>
              {isEditing ? "Save Changes" : "Create Task"}
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
}