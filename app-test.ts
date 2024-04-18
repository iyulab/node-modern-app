import { ReactComponent } from './test/ReactComponent';
import { App } from './test/App';
import './test/LitElement';

App.load({
  basepath: '/',
  routes: [
    { path: '/react', component: ReactComponent },
    { path: '/lit', element: 'u-lit', loader: async (url) => {
      return "hello lit" + url.pathname;
    }},
  ],
  header: {
    breadcrumbs: {
      'react': 'ReactComponent',
      'lit': 'LitElement',
      'sdsd': async (path) => {
        return path + ' Page';
      }
    },
    help: 'https://iyulab.com',
    theme: 'dark',
    locale: 'en',
    user: {
      name: 'John Doe',
      avatar: 'https://avatars.githubusercontent.com/u/1066040?v=4'
    }
  },
  sidebar: {
    menuItem: [
      { display: 'Home', icon: 'home' },
      { display: 'About', icon: 'info' },
      { display: 'Contact', icon: 'contact' },
    ]
  }
});
