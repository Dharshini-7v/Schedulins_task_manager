export type TaskStatus = "pending" | "active" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  timeLimitMinutes: number; // per-task time limit
  deadline?: string; // ISO date string
  status: TaskStatus;
  order: number;
}
