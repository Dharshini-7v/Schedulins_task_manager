import TaskForm from "@/components/plan/TaskForm";
import TaskList from "@/components/plan/TaskList";

export default function PlanPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Plan</h1>
        <p className="text-sm opacity-70">Create tasks, set time limits and deadlines, and arrange order.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <h2 className="text-lg font-medium mb-3">Add Task</h2>
          <TaskForm />
        </div>
        <div className="rounded-lg border p-4 bg-white/70 dark:bg-black/40">
          <h2 className="text-lg font-medium mb-3">Your Tasks</h2>
          <TaskList />
        </div>
      </div>
    </section>
  );
}
