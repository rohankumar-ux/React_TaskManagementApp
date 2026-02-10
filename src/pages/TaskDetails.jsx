import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import { useTasks } from "../context/TaskContext";
import TaskModal from "../components/TaskModal";

const STATUSES = ["TO_DO", "IN_PROGRESS", "DONE"];

const statusColors = {
  TO_DO: "default",
  IN_PROGRESS: "warning",
  DONE: "success",
};

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();

  const task = tasks.find(t => String(t.id) === id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  if (!task) return null;

  return (
    <Box
      p={{ xs: 2, sm: 4 }}
      maxWidth={720}
      mx="auto"
    >
      <Card elevation={3}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight={600}>
              {task.title}
            </Typography>
          }
          subheader={
            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={task.status.replace("_", " ")}
                color={statusColors[task.status]}
                size="small"
              />
            </Stack>
          }
          action={
            <Button
              size="small"
              variant="outlined"
              onClick={() => setEditOpen(true)}
            >
              Edit
            </Button>
          }
          sx={{ pb: 2 }}
        />

        <Divider />

        <CardContent sx={{ py: 3 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
          >
            Description
          </Typography>

          <Typography mb={4}>
            {task.description || "No description provided."}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
          >
            Update Status
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {STATUSES.map(s => (
              <Button
                key={s}
                size="small"
                variant={task.status === s ? "contained" : "outlined"}
                sx={{
                  textTransform: "none",
                  ...(s === "DONE" && {
                    bgcolor: "success.main",
                    color: "success.contrastText",
                    "&:hover": { bgcolor: "success.dark" },
                  }),
                  ...(s === "IN_PROGRESS" && {
                    borderColor: "warning.main",
                    color: "warning.main",
                  }),
                }}
                onClick={() => updateTask(id, { status: s })}
              >
                {s.replace("_", " ")}
              </Button>

            ))}
          </Stack>
        </CardContent>

        <Divider />

        <CardActions
          sx={{
            justifyContent: "space-between",
            px: 3,
            py: 2,
          }}
        >
          <Button
            color="error"
            variant="outlined"
            onClick={() => setDeleteConfirmOpen(true)}
          >
            Delete Task
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/tasks")}
          >
            Back to Tasks
          </Button>
        </CardActions>
      </Card>

      <TaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={task}
        onSave={data => updateTask(id, data)}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        title={`Delete "${task.title}"?`}
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={() => {
          deleteTask(id);
          setDeleteConfirmOpen(false);
          navigate("/tasks");
        }}
      />
    </Box>
  );
}
