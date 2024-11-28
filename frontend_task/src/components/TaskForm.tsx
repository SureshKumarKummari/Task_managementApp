import { useState } from 'react';
import axios from 'axios';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = { title, priority, status, startTime: new Date().toISOString() };

    try {
      await axios.post('/api/tasks', task);
      setTitle('');
      setPriority(1);
      setStatus('pending');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-200 rounded mb-4">
      <h2 className="text-xl mb-2">Create Task</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="w-full p-2 border rounded mb-4"
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(parseInt(e.target.value))}
        className="w-full p-2 border rounded mb-4"
      >
        {[1, 2, 3, 4, 5].map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
        className="w-full p-2 border rounded mb-4"
      >
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Create Task
      </button>
    </form>
  );
}
