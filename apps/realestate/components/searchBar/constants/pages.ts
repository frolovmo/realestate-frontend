import { basePath } from "@/lib/constants";
import { UserRole } from "@/lib/types";

export const SearchPagesByRoleMap = {
  [UserRole.DEVELOPER]: [
    {
      name: "Dashboard",
      path: `${basePath}/dashboard`,
    },
    {
      name: "Properties",
      path: `${basePath}/properties`,
    },
    {
      name: "Create Property",
      path: `${basePath}/properties/create-property`,
    },
  ],

  [UserRole.STAFF]: [
    {
      name: "Requests",
      path: `${basePath}/requests`,
    },
  ],

  [UserRole.APPLICANT]: [
    {
      name: "My Application",
      path: `${basePath}/application`,
    },
    {
      name: "Create Application",
      path: `${basePath}/application/create-application`,
    },
    {
      name: "Profile",
      path: `${basePath}/profile`,
    },
  ],
};
