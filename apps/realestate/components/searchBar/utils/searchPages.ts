import { UserRole } from "@/lib/types";
import { SearchPagesByRoleMap } from "../constants/pages";

const searchPages = ({ text, role }: { text: string; role: UserRole }) => {
  if (!text) {
    return [];
  }

  const rolePages = SearchPagesByRoleMap[role];

  return rolePages.filter((page) =>
    page.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
  );
};

export default searchPages;
