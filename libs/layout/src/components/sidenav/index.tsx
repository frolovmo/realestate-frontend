import React, { useEffect, useState } from 'react';
import { Menu } from 'primereact/menu';
import Image from 'next/image';
import { classNames } from 'primereact/utils';
import { usePathname } from 'next/navigation';
import { defaultMenuItems } from '../../lib/menu';

export interface Item {
  label?: string;
  icon?: string;
  url: string;
  className?: string;
  iconStyle?: { color: string };
  command?: () => void;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  url: string;
  className?: string;
  items?: Item[];
  iconStyle?: { color: string };
  template?: () => React.JSX.Element;
  onClick?: () => void;
}

interface Props {
  menuItems?: MenuItem[];
}

const SideNav = ({ menuItems }: Props): JSX.Element => {
  const [items, setItems] = useState(menuItems || defaultMenuItems);
  const path = usePathname();

  useEffect(() => {
    const menuItems = items;
    const formattedMenuItems = menuItems.map((item) => {
      return {
        ...item,
        url: item.url || '/',
        className: classNames({
          'bg-blue-50': path === item.url, // Add active class if route matches
        }),
      };
    });

    formattedMenuItems.unshift({
      className: '',
      url: '/',
      template: () => {
        // Add the brdLogoColored.svg as a logo
        return (
          <Image
            src="/brdLogoColored.svg"
            alt="logo"
            width={150}
            height={50}
            className="my-3 p-2 mx-5"
          />
        );
      },
    });

    setItems(formattedMenuItems);
  }, [menuItems]);

  return (
    <div className="w-15rem">
      <div className="main-content">
        <Menu
          model={items}
          className="w-15rem"
          style={{ border: 'none ', height: '100%' }}
        />
        <main className="content" />
      </div>
    </div>
  );
};

export default SideNav;
