import { Suspense } from "react";

import Layout from "@/components/layouts/sidebar";
import HeadingBar from "@/components/headingBar/headingBar";
import CreatePropertyForm from "@/components/createProperty/createPropertyForm";

import { getUserData } from "@/actions/auth";
import fetchPropertyById from "@/actions/fetchPropertyByid";
import { EditPropertyStatuses } from "@/lib/constants/properties";
import { PropertyStatus } from "@/lib/types/properties";
import { PropertyData } from "@/lib/types";
import DeletePropertyDialog from "@/components/DeletePropertyDialog";

export const fetchCache = "force-no-store";

export default async function EditPropertyPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const propertyId = params?.id;

  const user = await getUserData();
  const property = propertyId ? await fetchPropertyById(propertyId) : null;

  const heading = !property
    ? "My Properties > No data"
    : `My Properties > ${property.name}`;

  const getErrorMessage = (property: PropertyData | null) => {
    if (!property) {
      return "Property does not exists";
    }

    if (!EditPropertyStatuses.includes(property.status as PropertyStatus)) {
      return `Property with status "${property.status}" cannot be edited`;
    }

    return null;
  };

  const errorMessage = getErrorMessage(property);

  return (
    <Layout>
      <div>
        <HeadingBar
          heading={heading}
          actions={
            property && (
              <DeletePropertyDialog
                identifier={property.identifier}
                name={property.name}
              />
            )
          }
        />
        <Suspense>
          {!errorMessage ? (
            <CreatePropertyForm isEditMode user={user} property={property} />
          ) : (
            <div className="flex items-center justify-between px-6 py-9 border rounded-b-3xl">
              <h1>{errorMessage}</h1>
            </div>
          )}
        </Suspense>
      </div>
    </Layout>
  );
}
