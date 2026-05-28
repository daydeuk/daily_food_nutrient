# 프로젝트 컨텍스트 (다음 세션용)

## 프로젝트 개요

**목적:** 아침/점심/간식/저녁 식단 선택 → 영양소 자동 계산 웹 앱  
**경로:** `/Users/daydeuk/Documents/ETC/daily_food_nutrient`  
**배포 URL:** https://daydeuk.github.io/daily_food_nutrient/  
**저장소:** https://github.com/daydeuk/daily_food_nutrient

---

## 요건

1. 아침/점심/간식/저녁 카테고리별 음식 복수 선택 (체크박스)
2. 각 카테고리 내 메인 메뉴 먼저, 음료·사이드는 아래 정렬 (subcategory: main/side)
3. 제출 시 식사별 + 하루 총 영양소 합산 결과 표시
4. **주황색**: 개별 식사에서 1일 권장량의 50% 초과
5. **빨간색**: 하루 총 섭취량이 권장량 초과 (기준값 함께 표시)
6. 영양소 항목: 칼로리, 당류, 포화지방, 트랜스지방

---

## 기술 스택

- **React 19** + **TypeScript 6** (strict mode)
- **Vite 8** (빌드 도구, `base: '/daily_food_nutrient/'`)
- **Zustand 5** (상태 관리)
- **ESLint 10** flat config + **Prettier**
- **GitHub Actions** → **GitHub Pages** 자동 배포

---

## 아키텍처: Feature-based (Toss 컨벤션)

```
src/
├── features/
│   ├── diet/
│   │   ├── components/    DietForm, MealSection, FoodCheckbox
│   │   ├── constants/     foods.ts, nutritionLimits.ts, index.ts
│   │   ├── stores/        dietStore.ts (Zustand)
│   │   └── types/         MealType, FoodSubcategory, Nutrition, Food 등
│   └── result/
│       └── components/    ResultPanel, NutritionRow
├── App.tsx                isSubmitted 분기 → DietForm or ResultPanel
├── main.tsx
└── index.css
```

**path alias:** `@/` → `src/`  
**Named export 원칙** (default export 없음)

---

## Zustand Store (dietStore.ts)

```ts
state:   selections: MealSelections  // 식사별 선택 음식 Set
         isSubmitted: boolean

actions: toggleFood(meal, foodId)    // 음식 선택/해제
         submit()                    // 결과 화면 전환
         reset()                     // 초기화
         getNutritionResult()        // DailyNutritionResult 반환
```

`MealSelections = Record<'breakfast'|'lunch'|'snack'|'dinner', Set<string>>`

---

## 영양소 권장량 (nutritionLimits.ts)

2,000kcal 고정 기준. 실제 섭취 칼로리에 따라 기준이 변하지 않음.

| 항목 | 계산식 | 권장량 |
|------|--------|--------|
| 칼로리 | 고정 | 2,000 kcal |
| 당류 | 2000 × 20% ÷ 4 | 100 g |
| 포화지방 | 2000 × 7% ÷ 9 | 15.6 g |
| 트랜스지방 | 2000 × 1% ÷ 9 | 2.2 g |

`DAILY_NUTRITION_LIMITS` — 총량 초과 (빨간색)  
`HALF_DAILY_NUTRITION_LIMITS` — 50% 초과 (주황색, 개별 식사에 적용)

---

## 음식 데이터 (foods.ts)

`FOODS_BY_MEAL: Record<MealType, Food[]>` 구조.

| 카테고리 | 총 | main | side |
|----------|---|------|------|
| 아침 | 8 | 7 | 1 (바나나) |
| 점심 | 13 | 12 | 1 (탄산음료) |
| 간식 | 14 | 7 (빙수·케이크·빵류) | 7 (음료+맥플러리) |
| 저녁 | 7 | 7 | 0 |

**메뉴 추가 방법:**
```ts
{ id: 'unique_id', name: '음식명', subcategory: 'main', // 또는 'side'
  nutrition: { calories: 0, sugar: 0, saturatedFat: 0, transFat: 0 } }
```

---

## 배포 흐름

```
git push origin main (토큰 필요: repo + workflow 스코프)
  → GitHub Actions (.github/workflows/deploy.yml)
  → npm ci && npm run build → dist/ → GitHub Pages
```

---

## 알려진 개선 여지

- 음식 데이터가 하드코딩 → 추후 외부 데이터 연동 가능
- 선택 결과 저장 기능 없음 (localStorage 또는 노션 연동 가능)
- 칼로리 수치 소수점 표시 (`.toFixed(1)`) — 칼로리는 정수로 개선 가능

---

## 로컬 실행

```bash
cd /Users/daydeuk/Documents/ETC/daily_food_nutrient
npm run dev       # 개발 서버 → http://localhost:5173/daily_food_nutrient/
npm run build     # 프로덕션 빌드
npm run lint      # ESLint 검사
```
