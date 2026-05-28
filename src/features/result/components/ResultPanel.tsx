import { useDietStore } from '@/features/diet/stores';
import { MEAL_LABELS, DAILY_NUTRITION_LIMITS, HALF_DAILY_NUTRITION_LIMITS } from '@/features/diet/constants';
import { NutritionRow } from './NutritionRow';

const MEALS = ['breakfast', 'lunch', 'snack', 'dinner'] as const;

export function ResultPanel() {
  const { getNutritionResult, reset } = useDietStore();
  const result = getNutritionResult();

  return (
    <div className="result-panel">
      <h2 className="result-title">오늘의 식단 영양소 결과</h2>

      {MEALS.map((meal) => (
        <section key={meal} className="result-meal-section">
          <h3 className="result-meal-title">{MEAL_LABELS[meal]}</h3>
          <NutritionRow nutrition={result[meal]} warningLimits={HALF_DAILY_NUTRITION_LIMITS} />
        </section>
      ))}

      <section className="result-total-section">
        <h3 className="result-meal-title result-meal-title--total">하루 총 섭취량</h3>
        <NutritionRow nutrition={result.total} limits={DAILY_NUTRITION_LIMITS} />
      </section>

      <button className="reset-btn" onClick={reset}>
        다시 입력하기
      </button>
    </div>
  );
}
