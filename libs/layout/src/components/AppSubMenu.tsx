import type {
  Breadcrumb,
  BreadcrumbItem,
  MenuModel,
  MenuProps,
} from "../types";
import { Tooltip } from "primereact/tooltip";
import { useContext, useEffect, useRef } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "../context/layoutcontext";
import { MenuProvider } from "../context/menucontext";
import { ProtectedComponent } from "@uno/utils";

const AppSubMenu = (props: MenuProps) => {
  const { layoutState, setBreadcrumbs } = useContext(LayoutContext);
  const tooltipRef = useRef<Tooltip | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.hide();
      (tooltipRef.current as any).updateTargetEvents();
    }
  }, [layoutState?.overlaySubmenuActive]);

  useEffect(() => {
    generateBreadcrumbs(props.model);
  }, []);

  const generateBreadcrumbs = (model: MenuModel[]) => {
    const breadcrumbs: Breadcrumb[] = [];

    const getBreadcrumb = (item: BreadcrumbItem, labels: string[] = []) => {
      const { label, to, items } = item;

      label && labels.push(label);
      items &&
        items.forEach((_item) => {
          getBreadcrumb(_item, labels.slice());
        });
      to && breadcrumbs.push({ labels, to });
    };

    model.forEach((item) => {
      getBreadcrumb(item);
    });
    setBreadcrumbs(breadcrumbs);
  };

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {props.model.map((item, i) => {
          return !item.seperator ? (
            item.permission ? (
              <ProtectedComponent path={item.permission} method={item.method}>
                <AppMenuitem item={item} root={true} index={i} key={item.label} />
              </ProtectedComponent>
            ) : (
              <AppMenuitem item={item} root={true} index={i} key={item.label} />
            )
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
      <Tooltip
        ref={tooltipRef}
        target="li:not(.active-menuitem)>.tooltip-target"
      />
    </MenuProvider>
  );
};

export default AppSubMenu;
