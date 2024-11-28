// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskList from '../components/TaskList';

// export default function Dashboard() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       const res = await axios.get('/api/tasks/stats');
//       setStats(res.data);
//     };
//     fetchStats();
//   }, []);

//   if (!stats) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Task Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="p-4 bg-gray-100 rounded">
//           <h2>Total Tasks: {stats.total}</h2>
//         </div>
//         <div className="p-4 bg-gray-100 rounded">
//           <h2>Completed: {stats.completed} ({stats.completedPercentage}%)</h2>
//         </div>
//         <div className="p-4 bg-gray-100 rounded">
//           <h2>Pending: {stats.pending} ({stats.pendingPercentage}%)</h2>
//         </div>
//       </div>
//       <TaskList />
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';

// Define the shape of the stats object using TypeScript
interface Stats {
  total: number;
  completed: number;
  completedPercentage: number;
  pending: number;
  pendingPercentage: number;
}

export default function Dashboard() {
  // Use the Stats type and set the initial state as null
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/tasks/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2>Total Tasks: {stats.total}</h2>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2>Completed: {stats.completed} ({stats.completedPercentage}%)</h2>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2>Pending: {stats.pending} ({stats.pendingPercentage}%)</h2>
        </div>
      </div>
      <TaskList />
    </div>
  );
}
