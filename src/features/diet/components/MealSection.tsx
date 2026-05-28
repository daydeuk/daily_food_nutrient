import type { MealType } from '../types';
import { FOODS_BY_MEAL, MEAL_LABELS, SUBCATEGORY_LABELS } from '../constants';
import { FoodCheckbox } from './FoodCheckbox';

interface Props {
  meal: MealType;
}

export function MealSection({ meal }: Props) {
  const foods = FOODS_BY_MEAL[meal];
  const mainFoods = foods.filter((f) => f.subcategory === 'main');
  const sideFoods = foods.filter((f) => f.subcategory === 'side');
  const labels = SUBCATEGORY_LABELS[meal] ?? { main: '식사', side: '음료·사이드' };

  return (
    <section className="meal-section">
      <h2 className="meal-title">{MEAL_LABELS[meal]}</h2>

      <div className="food-group">
        <span className="food-group-label">{labels['main']}</span>
        <div className="food-list">
          {mainFoods.map((food) => (
            <FoodCheckbox key={food.id} food={food} meal={meal} />
          ))}
        </div>
      </div>

      {sideFoods.length > 0 && (
        <div className="food-group">
          <span className="food-group-label">{labels['side']}</span>
          <div className="food-list">
            {sideFoods.map((food) => (
              <FoodCheckbox key={food.id} food={food} meal={meal} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
