'use client';

import { FC } from 'react';
import { CheckCircle2, Trash2, Circle } from 'lucide-react';
import { UI_CONFIG } from '@/config/app.config';
import type { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: number, status: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export const TaskCard: FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  isLoading = false,
}) => {
  const handleToggle = async () => {
    try {
      await onToggle(task.id, !task.status);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        ${UI_CONFIG.GLASS_MORPHISM.BACKDROP}
        ${UI_CONFIG.GLASS_MORPHISM.BORDER}
        ${UI_CONFIG.ANIMATIONS.TRANSITION_NORMAL}
        hover:border-white/30 dark:hover:border-white/20
        hover:shadow-lg hover:shadow-white/5
        p-6 backdrop-saturate-150
      `}
    >
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

      <div className="relative z-10 space-y-4">
        {/* Header with checkbox and delete */}
        <div className="flex items-start justify-between gap-4">
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
              shrink-0 mt-1
              ${UI_CONFIG.ANIMATIONS.TRANSITION_FAST}
              hover:scale-110 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              ${task.status
                ? 'text-green-400 dark:text-green-500'
                : 'text-white/30 dark:text-white/20 hover:text-white/50 dark:hover:text-white/40'
              }
            `}
            aria-label={task.status ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.status ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`
                text-lg font-semibold leading-tight
                ${UI_CONFIG.ANIMATIONS.TRANSITION_FAST}
                ${task.status
                  ? 'text-gray-400 line-through dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
                }
              `}
            >
              {task.title}
            </h3>
          </div>

          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`
              shrink-0
              p-2 rounded-lg
              ${UI_CONFIG.ANIMATIONS.TRANSITION_FAST}
              bg-red-500/10 text-red-400/70 hover:bg-red-500/20 hover:text-red-400
              dark:bg-red-500/5 dark:text-red-400/60 dark:hover:bg-red-500/15
              hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-label="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        {task.description && (
          <p
            className={`
              text-sm leading-relaxed
              ${task.status
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-gray-600 dark:text-gray-300'
              }
            `}
          >
            {task.description}
          </p>
        )}

        {/* Footer with date */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
          {task.status && (
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
