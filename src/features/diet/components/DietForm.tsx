import { useDietStore } from '../stores';
import { MealSection } from './MealSection';

const MEALS = ['breakfast', 'lunch', 'snack', 'dinner'] as const;

export function DietForm() {
  const submit = useDietStore((s) => s.submit);

  return (
    <div className="diet-form">
      {MEALS.map((meal) => (
        <MealSection key={meal} meal={meal} />
      ))}
      <button className="submit-btn" onClick={submit}>
        결과 확인하기
      </button>
    </div>
  );
}
