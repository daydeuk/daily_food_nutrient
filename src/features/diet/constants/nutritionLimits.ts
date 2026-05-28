import type { Nutrition } from '../types';

export const DAILY_NUTRITION_LIMITS: Nutrition = {
  calories: 2000,
  sugar: 50,
  saturatedFat: 15,
  transFat: 2.2,
};

export const MEAL_LABELS: Record<string, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const NUTRITION_LABELS: Record<keyof Nutrition, string> = {
  calories: '칼로리',
  sugar: '당류',
  saturatedFat: '포화지방',
  transFat: '트랜스지방',
};

export const NUTRITION_UNITS: Record<keyof Nutrition, string> = {
  calories: 'kcal',
  sugar: 'g',
  saturatedFat: 'g',
  transFat: 'g',
};
