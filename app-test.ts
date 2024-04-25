import { ReactComponent } from './test-page/ReactComponent';
import { App } from './test/App';
import './test-page/LitElement';

console.log('App load');

App.load({
  basepath: '/app/:id',
  routes: [
    { title: "React!", path: '/react', component: ReactComponent },
    { title: "Lit!", path: '/lit', element: 'u-lit', loader: async (url) => {
      return "hello lit" + url.pathname;
    }},
  ],
  header: {
    title: {
      text: 'Hello World tiem sads ccsss',
      path: '/app'
    },
    breadcrumbs: {
      'react': 'React Component',
      'lit': 'Lit Element',
      '^\\d{6}$': async (path: any) => {
        return {
          icon: 'gom',
          display: `digital number: ${path}`
        }
      }
    },
    action: {
      locale: 'en',
      theme: 'dark',
      help: {
        href: '/help',
        target: '_top'
      },
      user: {
        name: 'John Doe',
        email: 'wwww',
        setting: '/setting',
        logout: '/logout',
        privacy: '/privacy',
        terms: '/terms',
      },
    }
  },
  sidebar: {
    menu: [
      { display:'Home', path: '/app' },
      { type: 'divider', line: true, text: 'Components', height: '100px'},
      { display: 'Group kkkkkkkkkkkkkkkkkkkkkkkkkkk', items: [
        { display: 'Lit Element', path: 'lit' },
        { display: 'React Component', path: 'react' },
      ]},
      { display:'Home', path: '/app' },
      { type: 'divider', line: true, text: 'Components', height: '100px'},
      { display: 'Group kkkkkkkkkkkkkkkkkkkkkkkkkkk', items: [
        { display: 'Lit Element', path: 'lit' },
        { display: 'React Component', path: 'react' },
      ]},
      { display:'Home', path: '/app' },
      { type: 'divider', line: true, text: 'Components', height: '100px'},
      { display: 'Group kkkkkkkkkkkkkkkkkkkkkkkkkkk', items: [
        { display: 'Lit Element', path: 'lit' },
        { display: 'React Component', path: 'react' },
      ]},
      { display:'Home', path: '/app' },
      { type: 'divider', line: true, text: 'Components', height: '100px'},
      { display: 'Group kkkkkkkkkkkkkkkkkkkkkkkkkkk', items: [
        { display: 'Lit Element', path: 'lit' },
        { display: 'React Component', path: 'react' },
      ]},
      { display:'Home', path: '/app' },
      { type: 'divider', line: true, text: 'Components', height: '100px'},
      { display: 'Group kkkkkkkkkkkkkkkkkkkkkkkkkkk', items: [
        { display: 'Lit Element', path: 'lit' },
        { display: 'React Component', path: 'react' },
      ]},
    ]
  }
});
