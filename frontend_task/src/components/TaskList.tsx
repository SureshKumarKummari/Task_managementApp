import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import React from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ priority: '', status: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', { params: filters });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [filters]);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="border p-2">
          <option value="">All Priorities</option>
          {[1, 2, 3, 4, 5].map(p => <option key={p} value={p}>Priority {p}</option>)}
        </select>
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="border p-2">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
