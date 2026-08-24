import HeadingBar from "@/components/headingBar/headingBar";
import CreatePropertyForm from "@/components/createProperty/createPropertyForm";
import Layout from "@/components/layouts/sidebar";
import { Suspense } from "react";
import { getUserData } from "../../../actions/auth";
import fetchPropertyById from "@/actions/fetchPropertyByid";
import DeletePropertyDialog from "@/components/DeletePropertyDialog";

export const fetchCache = "force-no-store";

export default async function CreatePropertyPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const propertyId = searchParams?.propertyId;

  const user = await getUserData();
  const property = propertyId ? await fetchPropertyById(propertyId) : null;

  const heading = !property
    ? "My Properties > Add Property"
    : `My Properties > ${property.name}`;

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
          <CreatePropertyForm user={user} property={property} />
        </Suspense>
      </div>
    </Layout>
  );
}
