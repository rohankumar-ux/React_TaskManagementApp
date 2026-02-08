import { Chip } from '@heroui/react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    TO_DO: { color: 'default', label: 'To Do' },
    IN_PROGRESS: { color: 'warning', label: 'In Progress' },
    DONE: { color: 'success', label: 'Done' },
  };

  const config = statusConfig[status] || statusConfig.TO_DO;

  return (
    <Chip color={config.color} size="sm" variant="flat">
      {config.label}
    </Chip>
  );
};

export default StatusBadge;