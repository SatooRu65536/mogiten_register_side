import { ReactElement } from 'react';
import Accounting from './pages/Accounting';
import Delivery from './pages/Delivery';
import Cooking from './pages/Cooking';

interface Route {
  name: string;
  path: string;
  element: ReactElement;
}

export const routes = [
  {
    name: '会計',
    path: '/accounting',
    element: <Accounting />,
  },
  {
    name: '受け渡し',
    path: '/delivery',
    element: <Delivery />,
  },
  {
    name: '調理',
    path: '/cooking',
    element: <Cooking />,
  },
] as const satisfies Route[];
