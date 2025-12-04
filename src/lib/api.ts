import { API_CONFIG } from '@/config/app.config';
import type { Task, CreateTaskPayload } from '@/types/task';

const baseURL = API_CONFIG.BASE_URL;

export const taskApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${baseURL}${API_CONFIG.ENDPOINTS.TASKS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  },

  // Create a new task
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await fetch(`${baseURL}${API_CONFIG.ENDPOINTS.TASKS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return response.json();
  },

  // Update task status
  updateTask: async (id: number, status: boolean): Promise<Task> => {
    const response = await fetch(`${baseURL}${API_CONFIG.ENDPOINTS.TASKS}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    return response.json();
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${baseURL}${API_CONFIG.ENDPOINTS.TASKS}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};
