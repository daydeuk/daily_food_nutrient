import type { Nutrition } from '../types';

export const CALORIES_DAILY_LIMIT = 2000;

const NUTRIENT_ENERGY_RATIOS = {
  sugar: { ratio: 0.20, kcalPerGram: 4 },       // 총 에너지의 20% 이내
  saturatedFat: { ratio: 0.07, kcalPerGram: 9 }, // 총 에너지의 7% 미만
  transFat: { ratio: 0.01, kcalPerGram: 9 },      // 총 에너지의 1% 미만
} as const;

export const DAILY_NUTRITION_LIMITS: Nutrition = {
  calories: CALORIES_DAILY_LIMIT,
  sugar: (CALORIES_DAILY_LIMIT * NUTRIENT_ENERGY_RATIOS.sugar.ratio) / NUTRIENT_ENERGY_RATIOS.sugar.kcalPerGram,
  saturatedFat: (CALORIES_DAILY_LIMIT * NUTRIENT_ENERGY_RATIOS.saturatedFat.ratio) / NUTRIENT_ENERGY_RATIOS.saturatedFat.kcalPerGram,
  transFat: (CALORIES_DAILY_LIMIT * NUTRIENT_ENERGY_RATIOS.transFat.ratio) / NUTRIENT_ENERGY_RATIOS.transFat.kcalPerGram,
};

export const HALF_DAILY_NUTRITION_LIMITS: Nutrition = {
  calories: DAILY_NUTRITION_LIMITS.calories * 0.5,
  sugar: DAILY_NUTRITION_LIMITS.sugar * 0.5,
  saturatedFat: DAILY_NUTRITION_LIMITS.saturatedFat * 0.5,
  transFat: DAILY_NUTRITION_LIMITS.transFat * 0.5,
};

export const MEAL_LABELS: Record<string, string> = {
  breakfast: '아침',
  lunch: '점심',
  snack: '간식',
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
