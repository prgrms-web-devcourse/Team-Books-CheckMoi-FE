# ![logo](https://user-images.githubusercontent.com/50919342/184589926-0e475e24-0e7b-4e9e-a68f-f0d9cc06e6a8.png)  책모이

[책모이 바로가기](https://checkmoi.vercel.app/)

![스크린샷 2022-08-15 오후 4 09 56](https://user-images.githubusercontent.com/50919342/184591672-6dc3e88b-b4f1-4e85-8d4d-2025b2e44fdd.png)

## 프로젝트 소개

`책모이` 는 온라인 상에서 책 스터디를 더 쉽고 편하게 운영하고 진행 할 수 있도록 도와주는 웹 서비스 입니다
- 사용자는 원하는 책을 검색해서 스터디를 등록 할 수 있습니다
- 원하는 책을 선택해서 해당 책을 대상으로 개설된 스터디에 참여 할 수 있습니다.
- 스터디내의 게시판을 통해서 스터디원들과 책 내용을 나눌수 있습니다.
- 게시판에서 댓글을 통해서 스티디원들과 다양한 소통이 가능합니다

## 실행방법
dev
```
yarn install
yarn dev
```

build
```
yarn build
yarn start
```

## env 설명
프로젝트를 실행시키려면 다음과 같은 환경변수가 필요합니다.

```jsx
NEXT_PUBLIC_X_NAVER_CLIENT_ID
NEXT_PUBLIC_X_NAVER_CLIENT_SECRET

NEXT_PUBLIC_KAKAO_API
NEXT_PUBLIC_API_END_POINT
```

## 개발 환경
- node: v16.14.2
- yarn: v1.22.19
- React: v18.2.0
- Next.js: v12.2.3
- mui, context api, storybook
- emotion
- eslint / prettier

## 폴더 구조
component별로 component, style, storybook을 작성하고 index에서 import/export를 관리합니다

```
components
  ├─ BookCard
     ├─ BookCard.stories.tsx
     ├─ BookCard.tsx
     ├─ BookCardSkeleton.tsx
     ├─ index.ts
     └─ style.tsx
```

## 팀원

### 깃허브

|엄윤성|고광필|김민기|박인화|정종관|
|-|-|-|-|-|
|[Github](https://github.com/blacktoast)|[Github](https://github.com/feel0321)|[Github](https://github.com/93minki)|[Github](https://github.com/parkinhwa)| [Github](https://github.com/devBuzz142)| 

### 역할
- 엄윤성 - 무한스크롤, 책 상세, 스터디 소개
- 고광필 - 홈, 검색, 탑바, 전역 Context
- 김민기 - 포스트 목록, 댓글, 스터디 상세
- 박인화 - 유저 프로필, 포스트
- 정종관 - 공통 API 설계, 스터디 생성, 수정
