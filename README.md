# @iyulab/modern-app

반응형 사이드바 레이아웃 기반의 현대적인 웹 애플리케이션 프레임워크

## ✨ 특징

- 🎨 **반응형 사이드바**: Small/Medium/Large 화면 크기에 따른 자동 적응형 레이아웃
- 🚀 **간단한 설정**: `app.load(config)` 한 줄로 앱 초기화
- 📱 **모바일 최적화**: Small 화면에서는 오버레이 사이드바, 상단 헤더 자동 표시
- 🧭 **계층형 네비게이션**: 중첩된 메뉴 구조 지원
- 🌓 **테마 시스템**: 라이트/다크 테마 및 시스템 테마 자동 감지
- 🔔 **알림 시스템**: 성공, 에러, 경고, 정보 메시지 표시
- 💬 **대화상자**: 확인, 입력, 커스텀 대화상자 지원
- 🔄 **라우팅**: @iyulab/router 기반 클라이언트 사이드 라우팅

## 📦 설치

```bash
pnpm add @iyulab/modern-app
```

## 🚀 빠른 시작

```typescript
import { app } from '@iyulab/modern-app';
import { html } from 'lit';

// 앱 설정 및 로드
await app.load({
  basepath: '/',
  routes: [
    {
      path: '/',
      render: () => html`<h1>Home</h1>`,
    },
    {
      path: '/about',
      render: () => html`<h1>About</h1>`,
    },
  ],
  breakpoints: [768, 1280], // [small, medium] 기본값
  layout: {
    logo: '/logo.svg', // 또는 HTML 문자열, TemplateResult
    title: 'My App',
    width: 260, // 사이드바 너비 (기본: 260px)
    collapsible: true, // collapse 가능 여부
    defaultCollapsed: false, // 기본 collapsed 상태
    navItems: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        path: '/',
      },
      {
        label: 'Settings',
        icon: 'settings',
        children: [
          {
            label: 'Profile',
            icon: 'user',
            path: '/settings/profile',
          },
          {
            label: 'Security',
            icon: 'lock',
            path: '/settings/security',
          },
        ],
      },
      {
        divider: true, // 구분선
      },
      {
        label: 'Help',
        icon: 'help',
        path: '/help',
      },
    ],
    buttons: [
      {
        label: 'Logout',
        icon: 'logout',
        action: () => {
          console.log('Logout clicked');
        },
      },
    ],
  },
});

// 페이지 이동
app.navigate('/about');

// 알림 표시
await app.success('저장되었습니다!');
```

## 📚 반응형 레이아웃

### 화면 크기별 동작

#### Small (< 768px)
- 사이드바가 완전히 숨겨짐 (오버레이 방식)
- 상단에 모바일 헤더 표시 (로고, 타이틀, 메뉴 버튼)
- 메뉴 버튼으로 사이드바 토글
- 네비게이션 후 자동으로 사이드바 닫힘

#### Medium (768px ~ 1280px)
- 일반 사이드바 표시
- Collapsible 버튼으로 사이드바 접기/펼치기
- 접힌 상태에서도 아이콘은 표시

#### Large (> 1280px)
- 넓은 사이드바 표시
- 모든 기능 완전 표시
- Collapsible 버튼으로 사이드바 접기/펼치기

### 레이아웃 설정 상세

```typescript
interface SidebarConfig {
  /** 로고 이미지 URL, HTML 또는 TemplateResult */
  logo?: string | TemplateResult;
  
  /** 앱 타이틀 */
  title?: string;
  
  /** 사이드바 너비 (기본: 260px) */
  width?: number;
  
  /** collapse 가능 여부 (기본: true) */
  collapsible?: boolean;
  
  /** 기본 collapsed 상태 (기본: false) */
  defaultCollapsed?: boolean;
  
  /** 네비게이션 아이템들 */
  navItems?: NavItem[];
  
  /** 하단 버튼들 */
  buttons?: ButtonConfig[];
}

interface NavItem {
  /** 레이블 */
  label: string;
  
  /** 아이콘 이름 (@iyulab/components의 u-icon) */
  icon?: string;
  
  /** 라우트 경로 */
  path?: string;
  
  /** 하위 네비게이션 아이템들 (계층형) */
  children?: NavItem[];
  
  /** 구분선 표시 여부 */
  divider?: boolean;
}

interface ButtonConfig {
  /** 버튼 레이블 */
  label: string;
  
  /** 아이콘 이름 */
  icon?: string;
  
  /** 클릭 액션 */
  action: () => void;
}
```

## 🎯 주요 API

### 라우팅
```typescript
app.navigate('/path');  // 페이지 이동
app.back();             // 뒤로 가기
app.forward();          // 앞으로 가기
```

### 알림
```typescript
await app.success('성공 메시지');
await app.error('에러 메시지');
await app.warning('경고 메시지');
await app.info('정보 메시지');
```

### 대화상자
```typescript
const confirmed = await app.confirm('삭제하시겠습니까?');
const name = await app.prompt({ label: '이름을 입력하세요' });
const result = await app.dialog(MyCustomDialog);
```

### 테마
```typescript
app.setTheme('dark');    // 다크 테마
app.setTheme('light');   // 라이트 테마
app.setTheme('system');  // 시스템 테마
```

### 반응형 상태 (MobX)
```typescript
import { autorun } from 'mobx';

autorun(() => {
  const screenSize = app.screen.get(); // 'small' | 'medium' | 'large'
  const theme = app.theme.get();       // 'light' | 'dark' | 'system'
  const isLoading = app.isLoading.get(); // boolean
});
```

### 브레이크포인트 커스터마이징
```typescript
await app.load({
  breakpoints: [600, 1024], // [small max, medium max]
  // ...
});
```

## 🏗️ 프로젝트 구조

```
modern-app/
├── src/
│   ├── App.ts                 # 메인 AppManager (싱글톤)
│   ├── index.ts               # 진입점
│   ├── layouts/               # 레이아웃
│   │   ├── SidebarLayout.ts   # 반응형 사이드바 레이아웃
│   │   └── index.ts
│   └── components/            # 공통 컴포넌트
│       ├── progress-bar/      # 진행률 표시
│       ├── nav-item/          # 계층형 네비게이션 아이템
│       ├── logo/              # 로고 컴포넌트
│       └── index.ts
└── package.json
```

## 🎨 컴포넌트

### ProgressBar
로딩 상태를 표시하는 진행률 바 컴포넌트

```typescript
import { ProgressBar } from '@iyulab/modern-app';

// HTML에서 직접 사용
<app-progress-bar value="50" height="4" color="#2563eb"></app-progress-bar>
<app-progress-bar indeterminate></app-progress-bar>
```

### NavItem
계층형 네비게이션 아이템 컴포넌트 (자동으로 사이드바에서 사용됨)

### Logo
로고 표시 컴포넌트 (자동으로 사이드바에서 사용됨)

## 📄 라이선스

MIT