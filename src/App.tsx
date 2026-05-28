import { useDietStore } from '@/features/diet/stores';
import { DietForm } from '@/features/diet/components';
import { ResultPanel } from '@/features/result/components';

export function App() {
  const isSubmitted = useDietStore((s) => s.isSubmitted);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">오늘의 식단 plan</h1>
      </header>
      <main className="app-main">
        {isSubmitted ? <ResultPanel /> : <DietForm />}
      </main>
    </div>
  );
}
