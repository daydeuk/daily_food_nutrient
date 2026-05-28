import type { MealType } from '../types';
import { FOOD_LIST, MEAL_LABELS } from '../constants';
import { FoodCheckbox } from './FoodCheckbox';

interface Props {
  meal: MealType;
}

export function MealSection({ meal }: Props) {
  return (
    <section className="meal-section">
      <h2 className="meal-title">{MEAL_LABELS[meal]}</h2>
      <div className="food-list">
        {FOOD_LIST.map((food) => (
          <FoodCheckbox key={food.id} food={food} meal={meal} />
        ))}
      </div>
    </section>
  );
}
