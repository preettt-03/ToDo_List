
import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Mark task as completed
  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle task editing
  const handleEditTask = (id, text) => {
    setEditTaskId(id);
    setEditedTaskText(text);
  };

  const handleSaveEditedTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editedTaskText } : task
      )
    );
    setEditTaskId(null);
    setEditedTaskText('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">To-Do List</h1>
      
      {/* Add Task */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-3 rounded-lg shadow-md ${
              task.completed ? 'bg-green-200' : 'bg-white'
            }`}
          >
            {/* Edit Task */}
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none mr-2"
                />
                <button
                  onClick={() => handleSaveEditedTask(task.id)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleEditTask(task.id, task.text)}
                  className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => handleCompleteTask(task.id)}
              className={`text-sm px-3 py-1 rounded-lg mr-2 ${
                task.completed ? 'bg-gray-500' : 'bg-green-500'
              } text-white hover:bg-opacity-80`}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
