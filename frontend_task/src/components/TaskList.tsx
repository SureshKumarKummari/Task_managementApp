import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

interface Task {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  priority: number;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <TaskForm />
      <div className="mt-4">
        <h2 className="text-xl mb-4">Tasks</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.priority}</td>
                <td className="px-4 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
