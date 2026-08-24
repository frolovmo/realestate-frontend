import { Sidebar } from "primereact/sidebar";
import { useContext } from "react";
import { LayoutContext } from "../context/layoutcontext";

const AppNotificationSidebar = () => {
  const { layoutState, setLayoutState } = useContext(LayoutContext);

  const onProfileSidebarHide = () => {
    setLayoutState((prevState: any) => ({
      ...prevState,
      notificationSidebarVisible: false,
    }));
  };

  return (
    <Sidebar
      visible={layoutState.notificationSidebarVisible}
      onHide={onProfileSidebarHide}
      position="right"
      className="layout-profile-sidebar w-full sm:w-25rem"
    >
      <div className="flex flex-column mt-5 mx-auto md:mx-0">
        <span className="mb-2 font-semibold">Notifications</span>
        <span className="text-color-secondary font-medium mb-5">
          You have 3 notifications
        </span>

        <ul className="list-none m-0 p-0">
          <li>
            <a className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
              <span>
                <i className="pi pi-comment text-xl text-primary"></i>
              </span>
              <div className="ml-3">
                <span className="mb-2 font-semibold">Notification 1</span>
                <p className="text-color-secondary m-0">5 min ago</p>
              </div>
            </a>
          </li>
          <li>
            <a className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
              <span>
                <i className="pi pi-trash text-xl text-primary"></i>
              </span>
              <div className="ml-3">
                <span className="mb-2 font-semibold">Notification 2</span>
                <p className="text-color-secondary m-0">15min ago</p>
              </div>
            </a>
          </li>
          <li>
            <a className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
              <span>
                <i className="pi pi-folder text-xl text-primary"></i>
              </span>
              <div className="ml-3">
                <span className="mb-2 font-semibold">Notification 3</span>
                <p className="text-color-secondary m-0">3h ago</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default AppNotificationSidebar;
