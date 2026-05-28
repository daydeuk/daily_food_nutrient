export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface Nutrition {
  calories: number;
  sugar: number;
  saturatedFat: number;
  transFat: number;
}

export interface Food {
  id: string;
  name: string;
  nutrition: Nutrition;
}

export type MealSelections = Record<MealType, Set<string>>;

export interface MealNutrition extends Nutrition {
  meal: MealType;
}

export interface DailyNutritionResult {
  breakfast: Nutrition;
  lunch: Nutrition;
  dinner: Nutrition;
  total: Nutrition;
}
