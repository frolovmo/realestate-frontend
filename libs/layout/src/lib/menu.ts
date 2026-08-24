import { auth } from '@uno/utils';
import { MenuItem } from '../components/sidenav';
const { userLogout } = auth;

export const defaultMenuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-home px-4 py-2 text-green-500",
    url: "/kataza/dashboard",
  },
  {
      label: "Ticket",
      icon: "pi pi-fw pi-ticket px-4 py-2 text-green-500",
      url: "/ticket",
  },
  {
      label: "Contact",
      icon: "pi pi-fw pi-address-book px-4 py-2 text-green-500",
      url: "/contact",
  },
  {
    label: 'Access',
    icon: 'pi pi-fw pi-users px-4 py-2',
    items: [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users px-4 py-2 text-green-500',
        url: '/access/users',
      },
      {
        label: 'Roles',
        icon: 'pi pi-fw pi-lock px-4 py-2 text-green-500',
        url: '/access/roles',
      },
      {
        label: 'Access',
        icon: 'pi pi-fw pi-key px-4 py-2 text-green-500',
        url: '/access/access',
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off px-4 py-2 text-green-500',
        url: '/',
        command: () =>  userLogout(),
      },
    ],
    url: '',
  },
];
