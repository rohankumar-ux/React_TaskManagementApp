import { Box, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useState, useEffect } from "react";

export default function TaskForm({ task, onSave, showNavigate = true }) {
  const { addTask } = useTasks();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (task) {
      setForm({ title: task.title, description: task.description || "" });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.title.trim()) {
      return;
    }

    const data = { title: form.title, description: form.description };

    if (onSave) {
      addTask({
        ...data,
        status: "TO_DO",
        createdAt: new Date().toISOString().split("T")[0]
      });
      onSave(data);
    } else {
      addTask({
        ...data,
        status: "TO_DO",
        createdAt: new Date().toISOString().split("T")[0]
      });
      if (showNavigate) navigate("/tasks");
    }
  };

  return (
    <Box p={3}>
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
          <Button type="submit" variant="contained">
            {task ? "Save" : "Create"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
