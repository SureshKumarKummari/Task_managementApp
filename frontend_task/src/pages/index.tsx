import { useState, useEffect } from 'react'
import Link from 'next/link'
import  TaskList  from '../components/TaskList'

const IndexPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch tasks from the backend API (assuming you have an endpoint for this)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks')
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  return (
    <div className="container mt-8">
      <h1 className="text-4xl font-bold text-center mb-6">Task Management App</h1>
      <div className="flex justify-center mb-6">
        <Link href="/tasks/new">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Add New Task
          </button>
        </Link>
      </div>

      {/* Display tasks */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="card">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Start Time:</strong> {new Date(task.startTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(task.endTime).toLocaleString()}</p>
              <div className="flex justify-end space-x-4 mt-4">
                <Link href={`/tasks/${task._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    View Task
                  </button>
                </Link>
                <Link href={`/tasks/edit/${task._id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default IndexPage
