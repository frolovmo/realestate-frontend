import {
  IdentifierIcon,
  LocatorIcon,
  ResidentialIcon,
} from "@/components/icons";
import Pagination from "@/components/pagination/pagination";
import { Badge, BadgeProps } from "../ui/badge";
import {
  PropertiesListResponseData,
  PropertyData,
} from "../../lib/types/index";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { basePath } from "../../lib/constants";
import { PropertyStatus } from "@/lib/types/properties";
import NoCacheLink from "../NoCacheLink";

interface Status {
  [key: string]: {
    text: string;
    variant: BadgeProps["variant"];
  };
}

const statuses: Status = {
  active: {
    text: "Active",
    variant: "primary",
  },
  inactive: {
    text: "Inactive",
    variant: "destructive",
  },
  draft: {
    text: "Draft",
    variant: "default",
  },
  pending: {
    text: "Pending",
    variant: "secondary",
  },
} as const;

interface PropertiesListProps {
  propertiesList: PropertiesListResponseData;
}

export default function PropertiesList({
  propertiesList,
}: PropertiesListProps) {
  const searchParams = useSearchParams();
  const { data, total } = propertiesList;

  const itemsPerPage = parseInt(searchParams.get("limit") || "2");
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    newSearchParams.set("limit", itemsPerPage.toString());
    window.location.href = `${basePath}/properties?${newSearchParams.toString()}`;
  };

  const getPropertyLink = (property: PropertyData) => {
    if (property.status === PropertyStatus.DRAFT) {
      return `${basePath}/properties/create-property?propertyId=${property.identifier}`;
    }

    return `${basePath}/properties/${property.identifier}`;
  };

  return (
    <div className="flex flex-col justify-between w-full">
      {data?.length ? (
        <div>
          {data.map((property) => (
            <div key={property.identifier}>
              <NoCacheLink href={getPropertyLink(property)}>
                <div className="flex border-b pt-8 pb-11">
                  <div className="border-4 border-primary rounded-md h-auto">
                    <Image
                      src={property.images[0].url}
                      alt={property.identifier}
                      width={208}
                      height={208}
                      className="object-cover h-[100%]"
                    />
                  </div>
                  <div className="flex flex-col gap-4 font-poppins mt-3 ml-6">
                    <p className="font-semibold text-lg text-black">
                      {property.name}
                    </p>
                    <p className="flex items-center font-semibold text-base italic">
                      <span className="inline-block min-w-6">
                        <IdentifierIcon width={17} height={17} />
                      </span>
                      {property.identifier}
                    </p>
                    <p className="flex items-center text-base text-black">
                      <span className="inline-block min-w-6">
                        <LocatorIcon width={15} height={19} />
                      </span>
                      {property.address}
                    </p>
                    <p className="flex items-center text-base text-black">
                      <span className="inline-block min-w-6">
                        <ResidentialIcon width={19} height={18} />
                      </span>
                      {property.cell}
                    </p>
                    <Badge
                      variant={statuses[property.status].variant}
                      className="w-fit"
                    >
                      {statuses[property.status].text}
                    </Badge>
                  </div>
                </div>
              </NoCacheLink>
            </div>
          ))}
          <div className="my-3">
            <Pagination
              disableLink
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center font-poppins text-base font-normal p-8">
          No properties yet
        </div>
      )}
    </div>
  );
}
