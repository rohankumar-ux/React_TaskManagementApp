import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Button,
  Divider
} from "@mui/material";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
  const { tasks } = useTasks();

  const countByStatus = (status) =>
    tasks.filter(t => t.status === status).length;

  const pendingCount = tasks.filter(t =>
    ["TO_DO", "IN_PROGRESS"].includes(t.status)
  ).length;

  const upcoming = tasks
    .slice()
    .filter(t => t.status !== "DONE")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const stats = [
    { label: "Total Tasks", value: tasks.length },
    { label: "To Do", value: countByStatus("TO_DO") },
    { label: "In Progress", value: countByStatus("IN_PROGRESS") },
    { label: "Completed", value: countByStatus("DONE") }
  ];

  return (
    <Box p={{ xs: 2, md: 4 }} bgcolor="background.default" minHeight="100vh">

      <Stack spacing={1} mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Welcome back 👋
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          You have <strong>{pendingCount}</strong> tasks pending
        </Typography>
      </Stack>

      <Grid container spacing={2} mb={4}>
        {stats.map((card) => (
          <Grid item md={3} key={card.label}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                textAlign: "center",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-2px)"
                }
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {card.label}
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={1} mb={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography variant="h6" fontWeight={600}>
            Upcoming Tasks
          </Typography>

          <Button color="primary" component={RouterLink}
            to="/tasks" >View All Tasks →</Button>
        </Stack>

        <Divider />
      </Stack>

      <Stack spacing={2}>
        {upcoming.length > 0 ? (
          upcoming.map(task => (
            <TaskCard
              key={`up-${task.id}`}
              task={task}
              showActions={false}
            />
          ))
        ) : (
          <Typography color="text.secondary">
            No upcoming tasks 🎉
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
