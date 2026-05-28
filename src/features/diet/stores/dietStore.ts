import { create } from 'zustand';
import type { MealType, MealSelections, DailyNutritionResult, Nutrition } from '../types';
import { FOODS_BY_MEAL } from '../constants';

interface DietState {
  selections: MealSelections;
  isSubmitted: boolean;
}

interface DietActions {
  toggleFood: (meal: MealType, foodId: string) => void;
  reset: () => void;
  submit: () => void;
  getNutritionResult: () => DailyNutritionResult;
}

const EMPTY_NUTRITION: Nutrition = { calories: 0, sugar: 0, saturatedFat: 0, transFat: 0 };

const FOOD_MAP = new Map(
  Object.values(FOODS_BY_MEAL)
    .flat()
    .map((food) => [food.id, food]),
);

function makeEmptySelections(): MealSelections {
  return { breakfast: new Set(), lunch: new Set(), snack: new Set(), dinner: new Set() };
}

function sumNutrition(foodIds: Set<string>): Nutrition {
  return [...foodIds].reduce<Nutrition>(
    (acc, id) => {
      const food = FOOD_MAP.get(id);
      if (food == null) return acc;
      return {
        calories: acc.calories + food.nutrition.calories,
        sugar: acc.sugar + food.nutrition.sugar,
        saturatedFat: acc.saturatedFat + food.nutrition.saturatedFat,
        transFat: acc.transFat + food.nutrition.transFat,
      };
    },
    { ...EMPTY_NUTRITION },
  );
}

export const useDietStore = create<DietState & DietActions>((set, get) => ({
  selections: makeEmptySelections(),
  isSubmitted: false,

  toggleFood: (meal, foodId) => {
    set((state) => {
      const next = new Set(state.selections[meal]);
      if (next.has(foodId)) {
        next.delete(foodId);
      } else {
        next.add(foodId);
      }
      return { selections: { ...state.selections, [meal]: next } };
    });
  },

  reset: () => {
    set({ selections: makeEmptySelections(), isSubmitted: false });
  },

  submit: () => {
    set({ isSubmitted: true });
  },

  getNutritionResult: () => {
    const { selections } = get();
    const breakfast = sumNutrition(selections.breakfast);
    const lunch = sumNutrition(selections.lunch);
    const snack = sumNutrition(selections.snack);
    const dinner = sumNutrition(selections.dinner);
    const total: Nutrition = {
      calories: breakfast.calories + lunch.calories + snack.calories + dinner.calories,
      sugar: breakfast.sugar + lunch.sugar + snack.sugar + dinner.sugar,
      saturatedFat: breakfast.saturatedFat + lunch.saturatedFat + snack.saturatedFat + dinner.saturatedFat,
      transFat: breakfast.transFat + lunch.transFat + snack.transFat + dinner.transFat,
    };
    return { breakfast, lunch, snack, dinner, total };
  },
}));
