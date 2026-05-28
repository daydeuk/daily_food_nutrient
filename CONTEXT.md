# 프로젝트 컨텍스트 (다음 세션용)

## 프로젝트 개요

**목적:** 아침/점심/저녁 식단 선택 → 영양소 자동 계산 웹 앱  
**경로:** `/Users/daydeuk/Documents/ETC/daily_food_nutrient`  
**배포 URL:** https://daydeuk.github.io/daily_food_nutrient/  
**저장소:** https://github.com/daydeuk/daily_food_nutrient

---

## 요건 (원본: Todo.md)

1. 아침/점심/저녁 카테고리별 음식 복수 선택 (체크박스)
2. 제출 시 식사별 + 하루 총 영양소 합산 결과 표시
3. 권장 섭취량 초과 항목은 빨간색으로 표시
4. 영양소 항목: 칼로리, 당류, 포화지방, 트랜스지방

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
│   │   ├── constants/     foods.ts (음식 15종), nutritionLimits.ts
│   │   ├── stores/        dietStore.ts (Zustand)
│   │   └── types/         MealType, Nutrition, Food 등
│   └── result/
│       └── components/    ResultPanel, NutritionRow
├── App.tsx                isSubmitted 분기 → DietForm or ResultPanel
├── main.tsx
└── index.css              토스 스타일 디자인 시스템
```

**path alias:** `@/` → `src/`  
**Named export 원칙** (default export 없음)

---

## Zustand Store 구조 (dietStore.ts)

```ts
state:   selections (MealSelections)  // 식사별 선택 음식 Set
         isSubmitted (boolean)

actions: toggleFood(meal, foodId)     // 음식 선택/해제
         submit()                     // 결과 화면 전환
         reset()                      // 초기화
         getNutritionResult()         // 영양소 합산 계산 반환
```

---

## 음식 데이터

`src/features/diet/constants/foods.ts` — 15종  
닭가슴살 샐러드, 김치볶음밥, 사과, 계란밥, 토스트, 바나나,  
비빔밥, 라면, 생선구이, 도시락, 샌드위치, 요거트, 파스타, 스테이크, 초밥

**추가 방법:** `FOOD_LIST` 배열에 항목 추가  
```ts
{ id: 'unique_id', name: '음식명', nutrition: { calories: 0, sugar: 0, saturatedFat: 0, transFat: 0 } }
```

---

## 배포 흐름

```
git push origin main
  → GitHub Actions (.github/workflows/deploy.yml)
  → npm ci && npm run build
  → dist/ → GitHub Pages
```

---

## 알려진 개선 여지

- 음식 목록이 아침/점심/저녁 동일 (끼니별 필터링 없음)
- 칼로리 표시가 `2000.0kcal` 소수점 포함 (정수로 표시 개선 가능)
- 음식 데이터가 하드코딩 → 추후 외부 데이터 연동 가능
- 선택 결과 저장 기능 없음 (localStorage 또는 노션 연동 가능)

---

## 로컬 실행

```bash
cd /Users/daydeuk/Documents/ETC/daily_food_nutrient
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드
npm run lint      # ESLint 검사
```
