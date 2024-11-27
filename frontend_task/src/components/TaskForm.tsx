import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

interface TaskFormProps {
  taskId?: string;
  onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (taskId) {
      // Fetch task details if editing
      axios.get(`/api/tasks/${taskId}`)
        .then(response => {
          const task = response.data;
          setTitle(task.title);
          setStartTime(task.startTime);
          setEndTime(task.endTime);
          setPriority(task.priority);
          setStatus(task.status);
        });
    }
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, startTime, endTime, priority, status };

    try {
      if (taskId) {
        await axios.put(`/api/tasks/${taskId}`, data);
      } else {
        await axios.post('/api/tasks', data);
      }
      onSubmit();
    } catch (err) {
      console.error('Error creating/updating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" required />
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border p-2 w-full" required />
      <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border p-2 w-full" required />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))} className="border p-2 w-full">
        {[1, 2, 3, 4, 5].map(p => (
          <option key={p} value={p}>Priority {p}</option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
      </select>
      <button type="submit" className="bg-blue-500 p-2 text-white rounded">{taskId ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
