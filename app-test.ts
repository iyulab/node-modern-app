import { ReactComponent } from './test/ReactComponent';
import { App } from './test/App';
import './test/LitElement';

App.load({
  basepath: '/',
  routes: [
    { title: "React!", path: '/react', component: ReactComponent },
    { path: '/lit', element: 'u-lit', loader: async (url) => {
      return "hello lit" + url.pathname;
    }},
  ],
  header: {
    title: {
      text: 'Hello World',
    },
    breadcrumbs: {
      'react': 'ReactComponent',
      'lit': 'LitElement',
      '/^d+/': async (path: any) => {
        return path + ' Page';
      }
    },
    help: {
      href: 'https://www.naver.com/help',
    },
    locale: 'en',
    user: {
      name: 'John Doe',
      avatar: 'https://avatars.githubusercontent.com/u/1066040?v=4'
    }
  },
  sidebar: {
    menuItem: [
      { display: 'Home', path: '/' },
      { type: 'line' , color: 'red' },
      { display: 'Group', items: [
        { display: 'About', path: '/about' },
        { display: 'Services', path: '/services' },
        { display: 'Contact', path: '/contact' },
      ]},
    ]
  }
});
