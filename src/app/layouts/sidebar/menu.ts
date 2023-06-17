import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENU',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Dashboard',
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
];
