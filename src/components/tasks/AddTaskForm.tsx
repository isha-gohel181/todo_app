'use client';

import { FC, useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { UI_CONFIG } from '@/config/app.config';
import type { CreateTaskPayload } from '@/types/task';

interface AddTaskFormProps {
  onAdd: (task: CreateTaskPayload) => Promise<void>;
  isLoading?: boolean;
}

export const AddTaskForm: FC<AddTaskFormProps> = ({ onAdd, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        status: false,
      });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className={`
          rounded-2xl
          ${UI_CONFIG.GLASS_MORPHISM.BACKDROP}
          ${UI_CONFIG.GLASS_MORPHISM.BORDER}
          ${UI_CONFIG.ANIMATIONS.TRANSITION_NORMAL}
          focus-within:border-white/30 dark:focus-within:border-white/20
          focus-within:shadow-xl focus-within:shadow-white/10
          p-6 backdrop-saturate-150
        `}
      >
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              disabled={isSubmitting || isLoading}
              className={`
                w-full bg-transparent text-white placeholder-white/40
                dark:placeholder-white/30
                font-medium text-lg outline-none
                ${UI_CONFIG.ANIMATIONS.TRANSITION_FAST}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            />
          </div>

          {/* Description Input */}
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description (optional)..."
              disabled={isSubmitting || isLoading}
              rows={2}
              className={`
                w-full bg-transparent text-white/80 placeholder-white/30
                dark:placeholder-white/20 dark:text-white/70
                text-sm outline-none resize-none
                ${UI_CONFIG.ANIMATIONS.TRANSITION_FAST}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
              <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white shadow-lg shadow-blue-500/10
                ${UI_CONFIG.ANIMATIONS.TRANSITION_NORMAL}
                hover:shadow-lg hover:shadow-blue-500/15 hover:scale-105
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
