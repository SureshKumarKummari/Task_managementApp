import React from 'react';
import { FC } from 'react';

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    startTime: string;
    endTime: string;
    priority: number;
    status: string;
  };
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="font-bold">{task.title}</h3>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Start Time:</strong> {new Date(task.startTime).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(task.endTime).toLocaleString()}</p>
    </div>
  );
};

export default TaskCard;
