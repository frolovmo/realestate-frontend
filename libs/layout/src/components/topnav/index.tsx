'use client';
import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { usePathname } from 'next/navigation';

const TopNav: React.FC = () => {
  const pathname = usePathname();
  const [name, setName] = useState('');

  const activeLabelVal = pathname.split('/').pop();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('user');
      setName(storedName || 'Guest');
    }
  }, []);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex justify-content-between bg-white align-items-center border-bottom-1 border-gray-300 p-3">
      <div>
        <label className="text-lg font-bold">
          {capitalize(activeLabelVal as string)}
        </label>
      </div>
      <div>
        <InputText placeholder="Search here..." className="w-full md:w-25rem" />
      </div>
      <div className="flex align-items-center">
        <div className="mx-5">
          <i className="pi pi-bell text-2xl p-overlay-badge">
            <Badge value="2" severity="danger"></Badge>
          </i>
        </div>
        <div className="border-1 border-round-3xl border-gray-300 rounded flex align-items-center p-2 w-15rem">
          <Avatar
            icon="pi pi-user"
            size="large"
            shape="circle"
            className="mr-3"
          />
          <div className="flex flex-column">
            <label>{name}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
