import type { Nutrition } from '@/features/diet/types';
import { NUTRITION_LABELS, NUTRITION_UNITS } from '@/features/diet/constants';

interface Props {
  nutrition: Nutrition;
  limits?: Nutrition;
}

export function NutritionRow({ nutrition, limits }: Props) {
  const keys = Object.keys(nutrition) as (keyof Nutrition)[];

  return (
    <div className="nutrition-row">
      {keys.map((key) => {
        const value = nutrition[key];
        const limit = limits?.[key];
        const isExceeded = limit != null && value > limit;

        return (
          <div key={key} className="nutrition-item">
            <span className="nutrition-label">{NUTRITION_LABELS[key]}</span>
            <span className={`nutrition-value ${isExceeded ? 'nutrition-value--exceeded' : ''}`}>
              {value.toFixed(1)}
              {NUTRITION_UNITS[key]}
            </span>
            {isExceeded && (
              <span className="nutrition-warning">⚠ 권장량 초과 (기준 {limit.toFixed(1)}{NUTRITION_UNITS[key]})</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
