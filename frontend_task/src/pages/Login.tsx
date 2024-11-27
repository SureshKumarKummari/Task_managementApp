import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);  // Store JWT token
      router.push('/dashboard');  // Redirect to dashboard
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="border p-2 w-full" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="border p-2 w-full" 
          required 
        />
        <button type="submit" className="bg-blue-500 p-2 text-white rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
