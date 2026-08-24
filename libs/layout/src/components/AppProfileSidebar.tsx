import { Sidebar } from "primereact/sidebar";
import { useContext, useState, useEffect } from "react";
import { LayoutContext } from "../context/layoutcontext";
import { auth } from "@uno/utils";
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

interface AppProfileSidebarProps {
  options: {
    username: string;
    profileUrl?: string;
    notificationUrl?: string;
    configUrl?: string;
  };
}
const AppProfileSidebar = ({ options }: AppProfileSidebarProps) => {
  const { layoutState, setLayoutState } = useContext(LayoutContext);
  const [currentRole, setCurrentRole] = useState<string>("");

  useEffect(() => {
    // Get the selectedRole from localStorage
    const selectedRoleStr = localStorage.getItem("selectedRole");
    if (selectedRoleStr) {
      try {
        const selectedRole = JSON.parse(selectedRoleStr);
        if (selectedRole && selectedRole.name) {
          setCurrentRole(selectedRole.name);
        }
      } catch (error) {
        console.error("Error parsing selectedRole from localStorage:", error);
      }
    }
  }, []);

  const onProfileSidebarHide = () => {
    setLayoutState((prevState: any) => ({
      ...prevState,
      profileSidebarVisible: false,
    }));
  };

  // Generate initials from username for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(/[ ._-]/);
    let initials = "";
    for (let i = 0; i < Math.min(parts.length, 2); i++) {
      if (parts[i].length > 0) {
        initials += parts[i][0].toUpperCase();
      }
    }
    return initials || name.substring(0, 1).toUpperCase();
  };

  return (
    <Sidebar
      visible={layoutState.profileSidebarVisible}
      onHide={onProfileSidebarHide}
      position="right"
      className="layout-profile-sidebar w-full sm:w-25rem"
    >
      <div className="flex flex-column p-4">
        {/* Profile Header */}
        <div className="flex align-items-center mb-4">
          <Avatar
            label={getInitials(options.username)}
            size="large"
            shape="circle"
            className="bg-primary mr-3"
            style={{ width: "4rem", height: "4rem", fontSize: "1.5rem" }}
          />
          <div className="flex flex-column">
            <span className="text-xl font-bold mb-1">Welcome</span>
            <span className="text-lg text-color-secondary">{options.username}</span>
            {currentRole && (
              <div className="mt-2">
                <Tag value={currentRole} severity="info" />
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* Menu Items */}
        <div className="mt-3">
          <h3 className="text-sm uppercase text-color-secondary font-semibold mb-3">
            Account
          </h3>
          <ul className="list-none m-0 p-0">
            <li className="mb-2">
              <Link
                href={options.profileUrl || "/profile"}
                className="no-underline cursor-pointer flex p-3 align-items-center border-round hover:surface-200 transition-colors transition-duration-150"
              >
                <span className="bg-primary border-circle p-2 flex align-items-center justify-content-center mr-3">
                  <i className="pi pi-user text-white text-lg"></i>
                </span>
                <span className="font-medium" onClick={onProfileSidebarHide}>Profile</span>
              </Link>
            </li>
            <li className="mb-2">
              <a className="no-underline cursor-pointer flex p-3 align-items-center border-round hover:surface-200 transition-colors transition-duration-150">
                <span className="bg-primary border-circle p-2 flex align-items-center justify-content-center mr-3">
                  <i className="pi pi-cog text-white text-lg"></i>
                </span>
                <span className="font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </div>

        <Divider />

        {/* Sign Out */}
        <div className="mt-3">
          <h3 className="text-sm uppercase text-color-secondary font-semibold mb-3">
            Session
          </h3>
          <ul className="list-none m-0 p-0">
            <li>
              <a
                className="no-underline cursor-pointer flex p-3 align-items-center border-round hover:surface-200 transition-colors transition-duration-150"
                onClick={() => auth.userLogout()}
              >
                <span
                  className="surface-500 border-circle p-2 flex align-items-center justify-content-center mr-3"
                  style={{ backgroundColor: "#f44336" }}
                >
                  <i className="pi pi-sign-out text-white text-lg"></i>
                </span>
                <span className="font-medium">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppProfileSidebar;
