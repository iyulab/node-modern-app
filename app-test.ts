import { ReactComponent } from './test/ReactComponent';
import { UTestApp } from './test/UTestApp';

UTestApp.load([
    {
      base: '',
      breakPoint: {
        small: 576,
        medium: 768,
        large: 992,
      },
      header: {
        help: 'Help',
        locale: 'Locale',
        logo: 'Logo',
        title: 'Title',
        user: 'User',
        breadcrumbs: {
          'home': {
            display: 'Home',
            icon: 'home',
          },
          'about': {
            display: 'About',
            icon: 'info',
          },
        }
      },
      routes: [
        {
          index: true,
          component: ReactComponent,
          children: [
            {
              path: 'about',
              component: ReactComponent
            }
          ]
        }
      ],
      sidebar: {
        mainMenu: [
          {
            display: 'Home',
            icon: 'home',
            children: [
              {
                display: 'About',
                icon: 'info',
              }
            ]
          }
        ],
        subMenu: [
          {
            display: 'Home',
            icon: 'home',
            children: [
              {
                display: 'About',
                icon: 'info',
              }
            ]
          }
        ]
      }
    }
]);