import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
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
        parentId: 2
      }
    ]
  }
];
