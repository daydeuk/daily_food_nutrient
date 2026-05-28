import { create } from 'zustand';
import type { MealType, MealSelections, DailyNutritionResult, Nutrition } from '../types';
import { FOOD_LIST } from '../constants';

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

const FOOD_MAP = new Map(FOOD_LIST.map((food) => [food.id, food]));

const initialSelections: MealSelections = {
  breakfast: new Set(),
  lunch: new Set(),
  dinner: new Set(),
};

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
  selections: {
    breakfast: new Set(),
    lunch: new Set(),
    dinner: new Set(),
  },
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
    set({ selections: { ...initialSelections, breakfast: new Set(), lunch: new Set(), dinner: new Set() }, isSubmitted: false });
  },

  submit: () => {
    set({ isSubmitted: true });
  },

  getNutritionResult: () => {
    const { selections } = get();
    const breakfast = sumNutrition(selections.breakfast);
    const lunch = sumNutrition(selections.lunch);
    const dinner = sumNutrition(selections.dinner);
    const total: Nutrition = {
      calories: breakfast.calories + lunch.calories + dinner.calories,
      sugar: breakfast.sugar + lunch.sugar + dinner.sugar,
      saturatedFat: breakfast.saturatedFat + lunch.saturatedFat + dinner.saturatedFat,
      transFat: breakfast.transFat + lunch.transFat + dinner.transFat,
    };
    return { breakfast, lunch, dinner, total };
  },
}));
