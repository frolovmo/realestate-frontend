'use client'
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import PrimeReact from "primereact/api";
import {
  useEventListener,
  useMountEffect,
  useResizeListener,
  useUnmountEffect,
} from "primereact/hooks";
import { DomHandler, classNames } from "primereact/utils";

import type { AppTopbarRef, ChildContainerProps } from "../types";
import AppBreadCrumb from "../components/AppBreadCrumb";
import AppProfileSidebar from "../components/AppProfileSidebar";
import AppNotificationSidebar from "../components/AppNotificationSidebar";
import AppSidebar from "../components/AppSidebar";
import AppTopbar from "../components/AppTopbar";
import { LayoutContext, LayoutProvider } from "../context/layoutcontext";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";
import { PermissionProvider } from "libs/utils/src/lib/context/PermissionContext";
import { sendRequestAtom } from "libs/utils/src/lib/Atom";
import { useAtom } from "jotai";
import { atom, HOC, auth } from "@uno/utils";

const Layout = (props: ChildContainerProps) => {
  const {
    layoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
  } = useContext(LayoutContext);
  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [bindDocumentResizeListener, unbindDocumentResizeListener] =
    useResizeListener({
      listener: () => {
        if (isDesktop() && !DomHandler.isTouchDevice()) {
          hideMenu();
        }
      },
    });

  let timeout: ReturnType<typeof setTimeout> | null = null;

  const onMouseEnter = () => {
    if (!layoutState.anchored) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setLayoutState((prevLayoutState: any) => ({
        ...prevLayoutState,
        sidebarActive: true,
      }));
    }
  };

  const onMouseLeave = () => {
    if (!layoutState.anchored) {
      if (!timeout) {
        timeout = setTimeout(
          () =>
            setLayoutState((prevLayoutState: any) => ({
              ...prevLayoutState,
              sidebarActive: false,
            })),
          300
        );
      }
    }
  };

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState: any) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlaySubmenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      resetMenu: (isSlim() || isSlimPlus() || isHorizontal()) && isDesktop(),
    }));
  }, [isSlim, isSlimPlus, isHorizontal, isDesktop, setLayoutState]);

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  };

  useMountEffect(() => {
    PrimeReact.ripple = true;
  });

  useEffect(() => {
    if (
      layoutState.overlayMenuActive ||
      layoutState.staticMenuMobileActive ||
      layoutState.overlaySubmenuActive
    ) {
      bindMenuOutsideClickListener();
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
      (isSlim() || isSlimPlus() || isHorizontal()) &&
        bindDocumentResizeListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
      unbindDocumentResizeListener();
      unblockBodyScroll();
    };
  }, [
    layoutState?.overlayMenuActive,
    layoutState?.staticMenuMobileActive,
    layoutState?.overlaySubmenuActive,
  ]);

  useEffect(() => {
    const onRouteChange = () => {
      hideMenu();
    };
    onRouteChange();
  }, [pathname, searchParams]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
  });

  const containerClass = classNames({
    "layout-light": layoutConfig?.colorScheme === "light",
    "layout-dim": layoutConfig?.colorScheme === "dim",
    "layout-dark": layoutConfig?.colorScheme === "dark",
    "layout-colorscheme-menu": layoutConfig?.menuTheme === "colorScheme",
    "layout-primarycolor-menu": layoutConfig?.menuTheme === "primaryColor",
    "layout-transparent-menu": layoutConfig?.menuTheme === "transparent",
    "layout-overlay": layoutConfig?.menuMode === "overlay",
    "layout-static": layoutConfig?.menuMode === "static",
    "layout-slim": layoutConfig?.menuMode === "slim",
    "layout-slim-plus": layoutConfig?.menuMode === "slim-plus",
    "layout-horizontal": layoutConfig?.menuMode === "horizontal",
    "layout-reveal": layoutConfig?.menuMode === "reveal",
    "layout-drawer": layoutConfig?.menuMode === "drawer",
    "layout-static-inactive":
      layoutState?.staticMenuDesktopInactive &&
      layoutConfig?.menuMode === "static",
    "layout-overlay-active": layoutState?.overlayMenuActive,
    "layout-mobile-active": layoutState?.staticMenuMobileActive,
    "p-input-filled": layoutConfig?.inputStyle === "filled",
    "p-ripple-disabled": !layoutConfig?.ripple,
    "layout-sidebar-active": layoutState?.sidebarActive,
    "layout-sidebar-anchored": layoutState?.anchored,
  });

  return (
    <div className={classNames("layout-container", containerClass)}>
      <div
        ref={sidebarRef}
        className="layout-sidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <AppSidebar menuModel={props.menuModel || []} />
      </div>
      <div className="layout-content-wrapper">
        <AppTopbar username={props.username || ''} ref={topbarRef} />

        <AppBreadCrumb className="content-breadcrumb"></AppBreadCrumb>
        <div className="layout-content">{props.children}</div>
      </div>
      <AppProfileSidebar
        options={{
          profileUrl: props.options?.profileUrl || "/profile",
          username: props.username || "",
        }}
      />
      <AppNotificationSidebar />
      {/* <AppConfig /> */}
      <div className="layout-mask"></div>
    </div>
  );
};

export const DashboardLayout = (props: ChildContainerProps) => {
  const [permissions, setPermissions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [, sendRequest] = useAtom(atom.sendRequestAtom);

  const role =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("selectedRole") || "{}")
    : {
        name: "",
      };


  useEffect(() => {
    async function fetchPermissions() {
      try {
        const response = await sendRequest({
          reqType: "post",
          url: "role-access/all",
          data: {
            roleName: role.name,
            page: 0,
            limit: 10000000,
          },
        });
        if (response.data.rows) setPermissions(response.data.rows);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      } finally {
        setLoading(false);
      }
    }

    const token = localStorage.getItem('token') 

    token && fetchPermissions();
  }, []);

  return (

    <PermissionProvider permissions={permissions} loading={loading}>
    <LayoutProvider>
      <Layout {...props} />
    </LayoutProvider>
    </PermissionProvider>
  );
};

export default DashboardLayout;
