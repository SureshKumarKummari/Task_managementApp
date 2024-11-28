// // import { useState, useEffect } from 'react'
// // import Link from 'next/link'
// // //import   TaskList  from '../components/TaskList';
// // import  { Task } from '../components/TaskList';


// // const IndexPage = () => {
// //   const [tasks, setTasks] = useState<Task[]>([])
// //   const [loading, setLoading] = useState<boolean>(true)

// //   // Fetch tasks from the backend API (assuming you have an endpoint for this)
// //   useEffect(() => {
// //     const fetchTasks = async () => {
// //       try {
// //         const response = await fetch('/api/tasks')
// //         const data = await response.json()
// //         setTasks(data)
// //       } catch (error) {
// //         console.error('Error fetching tasks:', error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchTasks()
// //   }, [])

// //   return (
// //     <div className="container mt-8">
// //       <h1 className="text-4xl font-bold text-center mb-6">Task Management App</h1>
// //       <div className="flex justify-center mb-6">
// //         <Link href="/tasks/new">
// //           <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
// //             Add New Task
// //           </button>
// //         </Link>
// //       </div>

// //       {/* Display tasks */}
// //       {loading ? (
// //         <p>Loading tasks...</p>
// //       ) : tasks.length === 0 ? (
// //         <p>No tasks available</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {tasks.map((task) => (
// //             <div key={task.id} className="card">
// //               <h2 className="text-xl font-semibold">{task.title}</h2>
// //               <p><strong>Status:</strong> {task.status}</p>
// //               <p><strong>Priority:</strong> {task.priority}</p>
// //               <p><strong>Start Time:</strong> {new Date(task.startTime).toLocaleString()}</p>
// //               <p><strong>End Time:</strong> {new Date(task.endTime).toLocaleString()}</p>
// //               <div className="flex justify-end space-x-4 mt-4">
// //                 <Link href={`/tasks/${task.id}`}>
// //                   <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
// //                     View Task
// //                   </button>
// //                 </Link>
// //                 <Link href={`/tasks/edit/${task.id}`}>
// //                   <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
// //                     Edit
// //                   </button>
// //                 </Link>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default IndexPage







// import { useState } from 'react';
// import { useRouter } from 'next/router';

// // Regular expression for validating email
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// const IndexPage = () => {
//   const [isLogin, setIsLogin] = useState<boolean>(true); // Manage whether showing Login or SignUp
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const router = useRouter();  // Initialize the router for redirection

//   // Handle form submission for login
//   const handleLogin = async () => {
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         // Redirect to the dashboard upon successful login
//         router.push('/dashboard');  // Programmatically redirect to the dashboard
//       } else {
//         setError(data.message || 'Login failed');
//       }
//     } catch (err) {
//       setError('Error logging in');
//     }
//   };

//   // Handle form submission for signup
//   const handleSignup = async () => {
//     // Validate email format using regex
//     if (!email.match(emailRegex)) {
//       setError('Please enter a valid email address');
//       return; // Stop the signup process if email is invalid
//     }

//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         router.push('/');
//       } else {
//         setError(data.message || 'Sign up failed');
//       }
//     } catch (err) {
//       setError('Error signing up');
//       console.log(err)
//     }
//   };

//   return (
//     <div className="container mt-8">
//       <h1 className="text-4xl font-bold text-center mb-6">
//         {isLogin ? 'Login' : 'Sign Up'} - Task Management App
//       </h1>

//       {/* Login or Sign Up form */}
//       <div className="max-w-sm mx-auto">
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             placeholder="Enter your password"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="flex justify-center mb-6">
//           <button
//             onClick={isLogin ? handleLogin : handleSignup}
//             className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//           >
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>
//         </div>

//         {/* Link to switch between Login and Sign Up */}
//         <div className="text-center">
//           <p>
//             {isLogin ? (
//               <>
//                 Don't have an account?{' '}
//                 <span
//                   className="text-blue-500 cursor-pointer"
//                   onClick={() => setIsLogin(false)}
//                 >
//                   Sign Up
//                 </span>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <span
//                   className="text-blue-500 cursor-pointer"
//                   onClick={() => setIsLogin(true)}
//                 >
//                   Login
//                 </span>
//               </>
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndexPage;








import { useState } from 'react';
import Link from 'next/link';

// For login/signup API calls, you will use fetch or axios.
const IndexPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true); // Manage whether showing Login or SignUp
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Redirect or set state to show dashboard
        console.log('Logged in successfully');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error logging in');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Redirect or show login form
        console.log('Signed up successfully');
        setIsLogin(true); // After sign up, show the login page
      } else {
        setError(data.message || 'Sign up failed');
      }
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <div className="container mt-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        {isLogin ? 'Login' : 'Sign Up'} - Task Management App
      </h1>

      {/* Login or Sign Up form */}
      <div className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-center mb-6">
          <button
            onClick={isLogin ? handleLogin : handleSignup}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>

        {/* Link to switch between Login and Sign Up */}
        <div className="text-center">
          <p>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
