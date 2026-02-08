import { Card, CardBody } from '@heroui/react';

const StatCard = ({ title, count, color = 'default' }) => {
  const colorClasses = {
    default: 'border-l-gray-400 bg-gradient-to-br from-gray-50 to-white',
    primary: 'border-l-blue-500 bg-gradient-to-br from-blue-50 to-white',
    warning: 'border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white',
    success: 'border-l-green-500 bg-gradient-to-br from-green-50 to-white',
  };

  return (
    <Card className={`border-l-4 ${colorClasses[color]} shadow-sm hover:shadow-md transition-shadow`}>
      <CardBody className="p-6">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">{title}</p>
        <p className="text-4xl font-bold text-gray-800">{count}</p>
      </CardBody>
    </Card>
  );
};

export default StatCard;