import { html } from 'lit';

import { app, type AppConfig } from '../src';
import './pages';

/**
 * Modern App 테스트 환경 설정
 */
const config: AppConfig = {
  // 루트 엘리먼트
  root: document.getElementById('app')!,
  
  // 기본 라우팅 경로
  basepath: '/',

  // 기본 아이콘 경로
  iconBasepath: '/icons/',

  // 라우팅 설정
  routes: [
    {
      index: true,
      render: () => {
        return html`<home-page></home-page>`;
      },
    },
    {
      path: '/about',
      render: () => {
        return html`<about-page></about-page>`;
      },
    },
  ],

  // 라우팅 실패 시 대체
  fallback: {
    title: 'Page Not Found',
    render: () => html`<notfound-page></notfound-page>`
  },

  // 테마 설정
  theme: {
    default: 'light',
    useBuiltIn: true,
    store: { 
      type: 'cookie', 
      prefix: 'test-',
      expires: new Date(Date.now() + 60 * 60 * 1000).getTime(), // 1 hour
    },
  },

  // 레이아웃 설정
  layout: {
    type: 'sidebar',
    logo: 'microsoft',
    title: 'Microsoft Sidebar Test Layout',
    main: [
      {
        type: 'html',
        render: (state) => html`
        <div style="padding: 8px; font-size: 14px; text-align: center; color: var(--u-red-500);"
          ?hidden=${state === 'slim' || state === 'mobile' || state === 'mobile-open'}>
          Like and subscribe! 
        </div>`
      },
      {
        type: 'link',
        icon: 'house',
        label: 'Home',
        href: '/',
      },
      {
        type: 'link',
        icon: 'person',
        label: 'About',
        href: '/about',
      },
      {
        type: 'section',
        title: 'Documentation Of Modern App Sidebar Section',
        subTitle: 'Learn more about Modern App and its features or get started quickly.',
        items: [
          {
            type: 'group',
            icon: 'rocket',
            label: 'Getting Started',
            items: [
              {
                type: 'link',
                href: '/docs/installation',
                label: 'Installation',
              },
              {
                type: 'link',
                href: '/docs/quick-start',
                label: 'Quick Start'
              },
              {
                type: 'link',
                href: '/docs/configuration',
                label: 'Configuration'
              }
            ]
          },
          {
            type: 'group',
            label: 'Features',
            icon: 'star',
            items: [
              {
                type: 'link',
                href: '/docs/routing',
                label: 'Routing',
              },
              {
                type: 'link',
                href: '/docs/theming',
                label: 'Theming',
              },
              {
                type: 'link',
                href: '/docs/layouts',
                label: 'Layouts',
              }
            ]
          }
        ]
      },
    ],
    footer: [
      {
        type: 'button',
        icon: 'toggles',
        label: 'Toggle Theme',
        onClick: () => {
          app.theme.set(app.theme.get() === 'dark' ? 'light' : 'dark');
        },
      },
      {
        type: 'html',
        render: (state) => html`
          <div style="padding: 8px; font-size: 12px; text-align: center; color: var(--u-text-color-weak);"
            ?hidden=${state === 'slim' || state === 'mobile'}>
            &copy; 2024 Modern App Test
          </div>`
      }
    ]
  },
};

// 앱 초기화 및 실행
(async () => {
  try {
    await app.load(config);
    console.log('✅ Modern App loaded successfully!');
  } catch (error) {
    console.error('❌ Failed to load Modern App:', error);
  }
})();
