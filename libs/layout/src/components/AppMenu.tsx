import type { MenuModel } from "../types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = ({ menuModel }: { menuModel: MenuModel[] }) => {
  return <AppSubMenu model={menuModel || []} />;
};

export default AppMenu;
