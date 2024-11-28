import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Save JWT token
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full p-2 border rounded mb-4"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </div>
  );
}
