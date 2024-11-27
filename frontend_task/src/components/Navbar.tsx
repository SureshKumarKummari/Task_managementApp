import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assume auth logic is handled here

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove JWT from local storage
    setIsAuthenticated(false);        // Update state
    window.location.href = '/login';  // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link href="/" className="text-2xl">Task Manager</Link>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="mr-4">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
          </>
        ) : (
          <Link href="/login" className="bg-blue-500 p-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
