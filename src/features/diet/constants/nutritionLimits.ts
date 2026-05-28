import type { Nutrition } from '../types';

export const CALORIES_DAILY_LIMIT = 2000;

const NUTRIENT_ENERGY_RATIOS = {
  sugar: { ratio: 0.20, kcalPerGram: 4 },       // 총 에너지의 20% 이내
  saturatedFat: { ratio: 0.07, kcalPerGram: 9 }, // 총 에너지의 7% 미만
  transFat: { ratio: 0.01, kcalPerGram: 9 },      // 총 에너지의 1% 미만
} as const;

export function computeDynamicLimits(totalCalories: number): Nutrition {
  return {
    calories: CALORIES_DAILY_LIMIT,
    sugar: (totalCalories * NUTRIENT_ENERGY_RATIOS.sugar.ratio) / NUTRIENT_ENERGY_RATIOS.sugar.kcalPerGram,
    saturatedFat: (totalCalories * NUTRIENT_ENERGY_RATIOS.saturatedFat.ratio) / NUTRIENT_ENERGY_RATIOS.saturatedFat.kcalPerGram,
    transFat: (totalCalories * NUTRIENT_ENERGY_RATIOS.transFat.ratio) / NUTRIENT_ENERGY_RATIOS.transFat.kcalPerGram,
  };
}

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
