'use client';

import { useEffect } from 'react';
import { CheckCheck, Settings } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { AddTaskForm, TaskList } from '@/components/tasks';

export default function Home() {
  const { tasks, isLoading, error, fetchTasks, addTask, toggleTask, removeTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <CheckCheck className="w-7 h-7 text-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Task Master
            </h1>
          </div>
          <p className="text-white/60 dark:text-white/50 text-lg font-medium">
            Organize your tasks with style and efficiency
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Add Task Form */}
          <div className="max-w-2xl mx-auto w-full">
            <AddTaskForm onAdd={addTask} isLoading={isLoading} />
          </div>

          {/* Stats Bar */}
          {tasks.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-xl bg-white/5 dark:bg-white/[0.02] border border-white/10 dark:border-white/5">
              <div className="flex gap-8">
                <div>
                  <p className="text-white/50 text-sm font-medium">Total Tasks</p>
                  <p className="text-2xl font-bold text-white">{tasks.length}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-400">
                    {tasks.filter((t) => t.status).length}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {tasks.filter((t) => !t.status).length}
                  </p>
                </div>
              </div>

              <button className="p-2.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Task List */}
          <div>
            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              error={error}
              onToggle={toggleTask}
              onDelete={removeTask}
              onRetry={fetchTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
