import { Box, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useState, useEffect } from "react";

export default function TaskForm({
  task,
  onSave,
  showNavigate = true
}) {
  const { addTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });

  const isEditing = !!task;

  useEffect(() => {
    setForm({
      title: task?.title || "",
      description: task?.description || ""
    });
  }, [task]);

  const saveTask = (data) => {
    if (isEditing) {
      updateTask(task.id, data);
      return;
    }

    addTask({
      ...data,
      status: "TO_DO",
      createdAt: new Date().toISOString().split("T")[0]
    });
  };

  const afterSave = (data) => {
    onSave?.(data);

    if (showNavigate) {
      navigate("/tasks");
      return;
    }

    if (!isEditing) {
      setForm({ title: "", description: "" });
    }
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {
      title: form.title.trim(),
      description: form.description.trim()
    };

    saveTask(data);
    afterSave(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: showNavigate ? 3 : 0 }}>
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
        <Button type="submit" variant="contained" fullWidth>
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </Stack>
    </Box>
  );
}