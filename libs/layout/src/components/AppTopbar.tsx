import type { AppTopbarRef } from "../types";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { LayoutContext } from "../context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

interface AppTopbarProps {
  username?: string;
}

function createInitials(name: string) {
  if (!name) return '';
  
  const parts = name.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return '';
  
  if (parts.length === 1) {
    return parts[0][0] || '';
  }
  
  const first = parts[0][0] || '';
  const last = parts[parts.length - 1][0] || '';
  return `${first.toUpperCase()}${last.toUpperCase()}`;
}

const AppTopbar = forwardRef<AppTopbarRef, AppTopbarProps>((props, ref) => {
  const { onMenuToggle, showProfileSidebar, showNotificationSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <div className="topbar-start">
        <button
          ref={menubuttonRef}
          type="button"
          className="topbar-menubutton p-link p-trigger"
          onClick={onMenuToggle}
        >
          <i className="pi pi-bars"></i>
        </button>
        {/* <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb> */}
      </div>

      <div className="topbar-end">
        <ul className="topbar-menu">
          {/* <li className="topbar-search">
            <span className="p-input-icon-left">
              <i className="pi pi-search"></i>
              <InputText
                type="text"
                placeholder="Search"
                className="w-12rem sm:w-full"
              />
            </span>
          </li> */}
          <li className="ml-3">
            <Button
              type="button"
              icon="pi pi-bell"
              text
              rounded
              severity="secondary"
              className="flex-shrink-0"
              onClick={showNotificationSidebar}
            ></Button>
          </li>
          <li className="topbar-profile">
            <button
              type="button"
              className="p-link"
              onClick={showProfileSidebar}
            >
              <Avatar size="large" label={createInitials(props.username || '')} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
