import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import StatusChip from "./StatusChip";
import { useTasks } from "../context/TaskContext";

export default function TaskCard({ task, showActions = true }) {
  const { updateTask } = useTasks();

  return (
    <Card sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6">{task.title}</Typography>
          <StatusChip status={task.status} sx={{ mt: 1 }} />
        </Stack>

        <Typography sx={{ mt: 1, color: "text.secondary" }}>{task.description}</Typography>
        <Typography sx={{ mt: 1, variant: "caption", color: "text.secondary" }}>
          {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : ""}
        </Typography>

        {showActions && (
          <Stack spacing={1} mt={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              {task.status === "TO_DO" && (
                <Button onClick={() => updateTask(task.id, { status: "IN_PROGRESS" })}>
                  Start
                </Button>
              )}

              {task.status === "IN_PROGRESS" && (
                <Button onClick={() => updateTask(task.id, { status: "DONE" })}>
                  Complete
                </Button>
              )}

              <Button component={Link} to={`/tasks/${task.id}`}>
                View
              </Button>
            </Stack>

          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
