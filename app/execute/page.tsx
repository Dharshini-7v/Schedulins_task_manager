import Executor from "@/components/execute/Executor";

export default function ExecutePage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Execute</h1>
        <p className="text-sm opacity-70">Locked task mode with countdown timer and progress.</p>
      </div>
      <Executor />
    </section>
  );
}
