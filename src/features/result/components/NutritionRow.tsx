import type { Nutrition } from '@/features/diet/types';
import { DAILY_NUTRITION_LIMITS, NUTRITION_LABELS, NUTRITION_UNITS } from '@/features/diet/constants';

interface Props {
  nutrition: Nutrition;
  isTotal?: boolean;
}

export function NutritionRow({ nutrition, isTotal = false }: Props) {
  const keys = Object.keys(nutrition) as (keyof Nutrition)[];

  return (
    <div className={`nutrition-row ${isTotal ? 'nutrition-row--total' : ''}`}>
      {keys.map((key) => {
        const value = nutrition[key];
        const limit = DAILY_NUTRITION_LIMITS[key];
        const isExceeded = isTotal && value > limit;

        return (
          <div key={key} className="nutrition-item">
            <span className="nutrition-label">{NUTRITION_LABELS[key]}</span>
            <span className={`nutrition-value ${isExceeded ? 'nutrition-value--exceeded' : ''}`}>
              {value.toFixed(1)}
              {NUTRITION_UNITS[key]}
            </span>
            {isExceeded && <span className="nutrition-warning">⚠ 권장량 초과</span>}
          </div>
        );
      })}
    </div>
  );
}
