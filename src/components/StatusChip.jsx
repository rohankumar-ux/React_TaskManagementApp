import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  const colorMap = {
    TO_DO: "warning",
    IN_PROGRESS: "info",
    DONE: "success"
  };

  return <Chip label={status} color={colorMap[status]} />;
}
