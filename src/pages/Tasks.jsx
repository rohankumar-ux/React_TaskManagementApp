import {
  Box,
  Button,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider
} from "@mui/material";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const FILTERS = [
  { value: "ALL", label: "All" },
  { value: "TO_DO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" }
];

export default function Tasks() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("ALL");
  const [open, setOpen] = useState(false);

  const filteredTasks =
    filter === "ALL"
      ? tasks
      : tasks.filter(task => task.status === filter);

  return (
    <Box p={{ xs: 2, md: 4 }} minHeight="100vh">

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Tasks
          </Typography>
          <Typography color="text.secondary">
            Manage and track your work
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
        >
          + New Task
        </Button>
      </Stack>

      <Stack spacing={2} mb={3}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, value) => value && setFilter(value)}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 0.5,
            width: "fit-content"
          }}
        >
          {FILTERS.map(f => (
            <ToggleButton
              key={f.value}
              value={f.value}
              sx={{
                px: 2,
                textTransform: "none",
                borderRadius: 1.5
              }}
            >
              {f.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Divider />
      </Stack>

      <Stack spacing={2}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <Box textAlign="center" py={6} color="text.secondary">
            <Typography variant="h6" gutterBottom>
              No tasks found
            </Typography>
            <Typography>
              Try switching filters or add a new task ✨
            </Typography>
          </Box>
        )}
      </Stack>

      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
