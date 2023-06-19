import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENU',
    isTitle: true,
  },
  {
    id: 2,
    label: 'DASHBOARD',
    collapseid: 'sidebarDashboards',
    icon: 'ri-dashboard-2-line',
    subItems: [
      {
        id: 3,
        label: 'Dashboard',
        link: '',
        parentId: 2,
      },
    ],
  },
  {
    id: 4,
    label: 'PAGE',
    collapseid: 'sidebarPages',
    icon: 'ri-pages-line',
    subItems: [
      {
        id: 5,
        label: 'Page',
        link: '',
        parentId: 4,
      },
    ],
  },
];
