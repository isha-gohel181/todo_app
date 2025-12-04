'use client';

import { useState, useCallback } from 'react';
import { taskApi } from '@/lib/api';
import type { Task, CreateTaskPayload } from '@/types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = useCallback(async (payload: CreateTaskPayload) => {
    setError(null);
    try {
      const newTask = await taskApi.createTask(payload);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      console.error(errorMessage);
      throw err;
    }
  }, []);

  const toggleTask = useCallback(async (id: number, newStatus: boolean) => {
    setError(null);
    try {
      const updatedTask = await taskApi.updateTask(id, newStatus);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      console.error(errorMessage);
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id: number) => {
    setError(null);
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      console.error(errorMessage);
      throw err;
    }
  }, []);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
  };
};
