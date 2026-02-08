import { Input, Textarea, Button } from '@heroui/react';
import { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
      });
    }
  }, [task]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Task Title"
        placeholder="Enter a clear and concise task title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        isInvalid={!!errors.title}
        errorMessage={errors.title}
        isRequired
        size="lg"
        classNames={{
          label: "text-base font-medium",
          input: "text-base"
        }}
      />
      
      <Textarea
        label="Description"
        placeholder="Add more details about your task (optional)"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        minRows={5}
        size="lg"
        classNames={{
          label: "text-base font-medium",
          input: "text-base"
        }}
      />
      
      <div className="flex gap-3 justify-end pt-4">
        <Button 
          color="default" 
          variant="bordered" 
          onPress={onCancel}
          size="lg"
        >
          Cancel
        </Button>
        <Button 
          color="primary" 
          type="submit"
          size="lg"
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;