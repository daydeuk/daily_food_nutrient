# 오늘의 식단 영양소 계산기

아침/점심/저녁 식단을 선택하면 칼로리, 당류, 포화지방, 트랜스지방을 자동으로 계산해주는 웹 앱입니다.

**배포 URL:** https://daydeuk.github.io/daily_food_nutrient/

---

## 기능

- 아침/점심/저녁 카테고리별 음식 복수 선택
- 식사별 영양소(칼로리, 당류, 포화지방, 트랜스지방) 합산
- 하루 총 섭취량 표시
- 하루 권장 섭취량 초과 항목 빨간색 강조 표시
- 모바일 최적화 UI

### 하루 권장 섭취량 기준

| 영양소 | 권장량 |
|--------|--------|
| 칼로리 | 2,000 kcal |
| 당류 | 50 g |
| 포화지방 | 15 g |
| 트랜스지방 | 2.2 g |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript 6 |
| 빌드 도구 | Vite 8 |
| 상태 관리 | Zustand 5 |
| 코드 품질 | ESLint 10 (flat config) + Prettier |
| 배포 | GitHub Pages + GitHub Actions |

---

## 프로젝트 구조

Toss 프론트엔드 컨벤션 기반의 Feature-based 아키텍처를 적용했습니다.

```
src/
├── features/
│   ├── diet/                   # 식단 입력 기능
│   │   ├── components/         # DietForm, MealSection, FoodCheckbox
│   │   ├── constants/          # 음식 데이터, 영양소 권장량
│   │   ├── stores/             # Zustand store (dietStore)
│   │   └── types/              # 타입 정의
│   └── result/                 # 결과 표시 기능
│       └── components/         # ResultPanel, NutritionRow
├── App.tsx
├── main.tsx
└── index.css
```

### 컨벤션

- TypeScript strict 모드 (`strict: true`, `noUncheckedIndexedAccess`)
- Named export 원칙 (default export 지양)
- `@/` path alias (`src/` 기준)
- 비즈니스 로직(영양소 계산)은 Zustand store에서 처리, 컴포넌트는 UI에만 집중
- barrel export (`index.ts`) per feature module

---

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

`dist/` 폴더에 정적 파일이 생성됩니다.

---

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후 GitHub Pages에 배포합니다.

```
push to main
  → npm ci
  → npm run build
  → dist/ 업로드
  → GitHub Pages 배포
```
