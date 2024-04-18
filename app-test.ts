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
  ]
});