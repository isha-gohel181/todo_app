'use client';

import { FC } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { TaskCard } from './TaskCard';
import type { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onToggle: (id: number, status: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onRetry?: () => void;
}

export const TaskList: FC<TaskListProps> = ({
  tasks,
  isLoading,
  error,
  onToggle,
  onDelete,
  onRetry,
}) => {
  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <Loader2 className="w-10 h-10 text-white/50 dark:text-white/40 animate-spin mb-4" />
        <p className="text-white/60 dark:text-white/50 font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-red-500/10 dark:bg-red-500/5 border border-red-500/30 dark:border-red-500/20 rounded-2xl p-6 text-center max-w-md">
          <AlertCircle className="w-8 h-8 text-red-400/70 dark:text-red-400/60 mx-auto mb-3" />
          <p className="text-red-400/80 dark:text-red-400/70 font-medium mb-3">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h3 className="text-white/70 dark:text-white/60 font-semibold mb-2">
            No tasks yet
          </h3>
          <p className="text-white/50 dark:text-white/40 text-sm">
            Create your first task to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
