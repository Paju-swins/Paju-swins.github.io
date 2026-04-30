# 모두랑 파주 — 파트너 미리보기 (Mockup)

**Re:DMZ · Regeneration & Relax** 사업의 정적 미리보기 사이트입니다. 파트너 기관에 디자인 시안을 공유하기 위한 용도로, 실제 서비스(지도 검색, 관광지 상세)는 포함되어 있지 않습니다.

- 본 미리보기는 **GitHub Pages** 로 배포됩니다.
- 콘텐츠는 한국어/영어 이중 언어로 제공됩니다.
- 지도 검색(Map Search) 페이지는 "준비 중" 안내로 대체됩니다.

## 로컬 실행

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 정적 빌드 → out/
```

## 배포

`main` 브랜치에 푸시하면 `.github/workflows/pages.yml` 워크플로가 자동으로 GitHub Pages 에 배포합니다.

## 기술 스택

- Next.js 16 (App Router, `output: 'export'`)
- React 19, TypeScript
- next-intl 4 (ko/en)
- Tailwind CSS 4

---

# Modurang Paju — Partner Preview (Mockup)

A static preview site for the **Re:DMZ · Regeneration & Relax** program, built to share the design with partner organizations. Live features (map search, point-of-interest details) are intentionally excluded.

- This preview is deployed to **GitHub Pages**.
- Content is bilingual (Korean / English).
- The Map Search page shows a "Coming Soon" placeholder.

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export → out/
```

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds and deploys to GitHub Pages.

## Stack

- Next.js 16 (App Router, `output: 'export'`)
- React 19, TypeScript
- next-intl 4 (ko/en)
- Tailwind CSS 4
