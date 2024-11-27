import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import React from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/statistics');
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        {stats && (
          <div className="space-y-4">
            <div><strong>Total Tasks:</strong> {stats.totalTasks}</div>
            <div><strong>Completed:</strong> {stats.completedPercentage}%</div>
            <div><strong>Pending:</strong> {stats.pendingPercentage}%</div>
            <div><strong>Average Time (hrs):</strong> {stats.averageTime}</div>
          </div>
        )}
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
