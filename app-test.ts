import { ReactComponent } from './test-page/ReactComponent';
import { App } from './test/App';
import './test-page/LitElement';

App.load({
  basepath: '/app/:id',
  routes: [
    { title: "React!", path: '/react', component: ReactComponent },
    { path: '/lit', element: 'u-lit', loader: async (url) => {
      return "hello lit" + url.pathname;
    }},
  ],
  header: {
    title: {
      text: 'Hello World',
      path: '/app'
    },
    breadcrumbs: {
      'react': 'React Component',
      'lit': 'Lit Element',
      '/^d+/': async (path: any) => {
        return path + ' Page';
      }
    },
    
    action: {
      theme: 'dark',
      help: {
        href: '/help',
        target: '_top'
      },
      locale: 'en',
      user: {
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/1066040?v=4'
      },
    }
  },
  sidebar: {
    menu: [
      { display:'Home', path: '/app' },
      { type: 'divider', line: true, text: 'Components', height: '100px'},
      { display: 'Group', items: [
        { display: 'Lit Element', path: 'lit' },
        { display: 'React Component', path: 'react' },
      ]},
    ]
  }
});
