import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import { useTasks } from "../context/TaskContext";

export default function TaskDetails() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();

  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  return (
    <Box p={3}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      
      <Stack direction="row" spacing={1}>
        {["TO_DO", "IN_PROGRESS", "DONE"].map(s => (
          <Button key={s} onClick={() => updateTask(id, { status: s })}>
            {s}
          </Button>
        ))}
      </Stack>

      <Button color="error" onClick={() => {
        deleteTask(id);
        navigate("/tasks");
      }}>
        Delete
      </Button>
    </Box>
  );
}
