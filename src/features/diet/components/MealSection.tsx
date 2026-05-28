import type { MealType } from '../types';
import { FOODS_BY_MEAL, MEAL_LABELS } from '../constants';
import { FoodCheckbox } from './FoodCheckbox';

interface Props {
  meal: MealType;
}

export function MealSection({ meal }: Props) {
  return (
    <section className="meal-section">
      <h2 className="meal-title">{MEAL_LABELS[meal]}</h2>
      <div className="food-list">
        {FOODS_BY_MEAL[meal].map((food) => (
          <FoodCheckbox key={food.id} food={food} meal={meal} />
        ))}
      </div>
    </section>
  );
}
