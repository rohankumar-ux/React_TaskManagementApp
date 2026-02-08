import { Card, CardBody } from '@heroui/react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-50 border-green-500' : 
                  type === 'error' ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-500';
  
  const textColor = type === 'success' ? 'text-green-800' : 
                    type === 'error' ? 'text-red-800' : 'text-blue-800';

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top">
      <Card className={`${bgColor} ${textColor} min-w-[320px] border-l-4 shadow-lg`}>
        <CardBody className="py-4 px-5">
          <p className="font-semibold">{message}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Notification;