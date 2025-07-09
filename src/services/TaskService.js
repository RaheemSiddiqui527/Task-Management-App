// Mock task service - in a real app this would use axios to call APIs
const STORAGE_KEY = 'tasks';

// Helper function to get tasks from localStorage
const getStoredTasks = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

// Helper function to save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Generate a simple ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const getTasks = async (token) => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  return getStoredTasks();
};

const createTask = async (taskData, token) => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  const tasks = getStoredTasks();
  const newTask = {
    _id: generateId(),
    ...taskData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  
  return newTask;
};

const updateTask = async (id, taskData, token) => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  const tasks = getStoredTasks();
  const taskIndex = tasks.findIndex(task => task._id === id);
  
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...taskData,
    updatedAt: new Date().toISOString()
  };
  
  saveTasksToStorage(tasks);
  
  return tasks[taskIndex];
};

const deleteTask = async (id, token) => {
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  const tasks = getStoredTasks();
  const filteredTasks = tasks.filter(task => task._id !== id);
  
  if (tasks.length === filteredTasks.length) {
    throw new Error('Task not found');
  }
  
  saveTasksToStorage(filteredTasks);
  
  return { message: 'Task deleted successfully' };
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};

export default taskService;