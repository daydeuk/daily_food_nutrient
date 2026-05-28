import type { Food, MealType } from '../types';
import { useDietStore } from '../stores';

interface Props {
  food: Food;
  meal: MealType;
}

export function FoodCheckbox({ food, meal }: Props) {
  const { selections, toggleFood } = useDietStore();
  const checked = selections[meal].has(food.id);

  return (
    <label className="food-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleFood(meal, food.id)}
      />
      <span className="food-name">{food.name}</span>
      <span className="food-calories">{food.nutrition.calories}kcal</span>
    </label>
  );
}
