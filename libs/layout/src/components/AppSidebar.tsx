import Link from "next/link";
import { useContext } from "react";
import AppMenu from "./AppMenu";
import { LayoutContext } from "../context/layoutcontext";
import { MenuProvider } from "../context/menucontext";
import { LayoutState, MenuModel } from "../types";
import Image from "next/image";

const AppSidebar = ({ menuModel }: { menuModel: MenuModel[] }) => {
  const { setLayoutState } = useContext(LayoutContext);
  const anchor = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      anchored: !prevLayoutState.anchored,
    }));
  };
  return (
    <>
      <div className="sidebar-header">
          <Image
            src="/brdLogoColored.svg"
            alt="BRD Logo"
            height={60}
            width={100}
          />
        <button
          className="layout-sidebar-anchor p-link z-2 mb-2"
          type="button"
          onClick={anchor}
        ></button>
      </div>

      <div className="layout-menu-container">
        <MenuProvider>
          <AppMenu menuModel={menuModel} />
        </MenuProvider>
      </div>
    </>
  );
};

export default AppSidebar;
