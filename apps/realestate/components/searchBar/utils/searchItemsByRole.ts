import { UserRole } from "@/lib/types";
import { ISearchBarDropdownCategory } from "../components/SearchBarDropdown/SearchBarDropdown.types";
import searchPages from "./searchPages";
import {
  SearchPropertiesField,
  searchProperties,
} from "@/actions/searchProperties";
import { SearchUnitsField, searchUnits } from "@/actions/searchUnits";
import { basePath } from "@/lib/constants";
import { SearchRequestsField, searchRequests } from "@/actions/searchRequests";

interface ISearchItemsByRoleParams {
  text: string;
  role: UserRole;
}

enum CategoryName {
  PAGES = "Pages",
  PROPERTIES = "Properties",
  UNITS = "Units",
  REQUESTS = "Requests",
}

async function searchItemsByRole({ text, role }: ISearchItemsByRoleParams) {
  try {
    switch (role) {
      case UserRole.DEVELOPER:
        return await searchItemsForDeveloper(text);

      case UserRole.STAFF:
        return await searchItemsForStaff(text);

      case UserRole.APPLICANT:
        return await searchItemsForApplicant(text);

      default:
        return [];
    }
  } catch (e) {
    console.log(e);

    return [];
  }
}

async function searchItemsForDeveloper(
  text: string
): Promise<ISearchBarDropdownCategory[]> {
  const pages = getPagesByRole({ text, role: UserRole.DEVELOPER });
  const properties = await getProperties(text);
  const units = await getUnits(text);

  const searchItems = [pages, properties, units].filter(Boolean);

  return searchItems as ISearchBarDropdownCategory[];
}

async function searchItemsForStaff(
  text: string
): Promise<ISearchBarDropdownCategory[]> {
  const pages = getPagesByRole({ text, role: UserRole.STAFF });
  const requests = await getRequests(text);

  const searchItems = [pages, requests].filter(Boolean);

  return searchItems as ISearchBarDropdownCategory[];
}

async function searchItemsForApplicant(
  text: string
): Promise<ISearchBarDropdownCategory[]> {
  const pages = getPagesByRole({ text, role: UserRole.APPLICANT });

  const searchItems = [pages].filter(Boolean);

  return searchItems as ISearchBarDropdownCategory[];
}

function getPagesByRole({
  role,
  text,
}: ISearchItemsByRoleParams): ISearchBarDropdownCategory | null {
  const pages = searchPages({
    text,
    role,
  });

  if (pages.length) {
    const categoryItems = pages.map((page) => ({
      path: page.path,
      name: `View ${page.name}`,
    }));

    return {
      categoryName: CategoryName.PAGES,
      categoryItems,
    };
  }

  return null;
}

async function getProperties(
  text: string
): Promise<ISearchBarDropdownCategory | null> {
  const properties = await searchProperties({
    text,
    fields: [SearchPropertiesField.NAME],
  });

  if (properties.data.length) {
    const categoryItems = properties.data.map((property) => ({
      name: property.name,
      path: `${basePath}/properties/${property.identifier}`,
    }));

    return {
      categoryName: CategoryName.PROPERTIES,
      categoryItems,
    };
  }

  return null;
}

async function getUnits(
  text: string
): Promise<ISearchBarDropdownCategory | null> {
  const units = await searchUnits({
    text,
    fields: [SearchUnitsField.NAME],
  });

  if (units.data.length) {
    const categoryItems = units.data.map((unit) => ({
      name: unit.name,
      path: `${basePath}/unit/${unit.identifier}`,
    }));

    return {
      categoryName: CategoryName.UNITS,
      categoryItems,
    };
  }

  return null;
}

async function getRequests(
  text: string
): Promise<ISearchBarDropdownCategory | null> {
  const requests = await searchRequests({
    text,
    fields: [SearchRequestsField.NAME],
  });

  if (requests.data.length) {
    const categoryItems = requests.data.map((request) => ({
      name: request.name,
      path: `${basePath}/unit/${request.identifier}`,
    }));

    return {
      categoryName: CategoryName.REQUESTS,
      categoryItems,
    };
  }

  return null;
}

export default searchItemsByRole;
