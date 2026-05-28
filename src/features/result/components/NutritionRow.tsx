import type { Nutrition } from '@/features/diet/types';
import { NUTRITION_LABELS, NUTRITION_UNITS } from '@/features/diet/constants';

interface Props {
  nutrition: Nutrition;
  limits?: Nutrition;
  warningLimits?: Nutrition;
}

export function NutritionRow({ nutrition, limits, warningLimits }: Props) {
  const keys = Object.keys(nutrition) as (keyof Nutrition)[];

  return (
    <div className="nutrition-row">
      {keys.map((key) => {
        const value = nutrition[key];
        const isExceeded = limits != null && value > limits[key];
        const isWarning = !isExceeded && warningLimits != null && value > warningLimits[key];

        return (
          <div key={key} className="nutrition-item">
            <span className="nutrition-label">{NUTRITION_LABELS[key]}</span>
            <span className={`nutrition-value ${isExceeded ? 'nutrition-value--exceeded' : ''} ${isWarning ? 'nutrition-value--warning' : ''}`}>
              {value.toFixed(1)}
              {NUTRITION_UNITS[key]}
            </span>
            {isExceeded && (
              <span className="nutrition-warning nutrition-warning--exceeded">⚠ 권장량 초과 (기준 {limits[key].toFixed(1)}{NUTRITION_UNITS[key]})</span>
            )}
            {isWarning && (
              <span className="nutrition-warning nutrition-warning--warning">⚠ 1일 권장량의 50% 초과</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
