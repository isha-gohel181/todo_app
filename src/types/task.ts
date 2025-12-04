export type Task = {
  id: number;
  title: string;
  description?: string;
  status: boolean;
  createdAt: string;
};

export type CreateTaskPayload = Omit<Task, 'id' | 'createdAt'>;
export type UpdateTaskPayload = Partial<Omit<Task, 'id' | 'createdAt'>>;
