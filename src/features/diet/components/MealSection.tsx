import type { MealType } from '../types';
import { FOODS_BY_MEAL, MEAL_LABELS } from '../constants';
import { FoodCheckbox } from './FoodCheckbox';

interface Props {
  meal: MealType;
}

export function MealSection({ meal }: Props) {
  const foods = [...FOODS_BY_MEAL[meal]].sort((a, b) =>
    a.subcategory === b.subcategory ? 0 : a.subcategory === 'main' ? -1 : 1,
  );

  return (
    <section className="meal-section">
      <h2 className="meal-title">{MEAL_LABELS[meal]}</h2>
      <div className="food-list">
        {foods.map((food) => (
          <FoodCheckbox key={food.id} food={food} meal={meal} />
        ))}
      </div>
    </section>
  );
}
