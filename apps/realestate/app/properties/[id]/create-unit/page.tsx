import HeadingBar from "@/components/headingBar/headingBar";
import CreateUnitForm from "@/components/createUnit/createUnitForm";
import Layout from "@/components/layouts/sidebar";
import { notFound } from "next/navigation";
import fetchPropertyById from "@/actions/fetchPropertyByid";
import DeleteUnitDialog from "@/components/DeleteUnitDialog";

export default async function CreateUnitPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string>;
}) {
  const { id } = params;
  const unitId = searchParams?.unitid;
  // Fetch the property data
  const property = await fetchPropertyById(id);
  if (!property) {
    notFound(); // Navigate to the 404 page if the property is not found
  }
  const unit = property?.units.find((unit) => unit.identifier === unitId);

  const heading = !unit
    ? `My Properties > ${property.name} > New Unit`
    : `My Properties > ${property.name} > ${unit.name}`;

  return (
    <Layout>
      <div>
        <HeadingBar
          heading={heading}
          actions={
            unit &&
            property && (
              <DeleteUnitDialog
                unitName={unit.name}
                unitIdentifier={unit.identifier}
                propertyIdentifier={property.identifier}
              />
            )
          }
        />
        <CreateUnitForm propertyId={id} property={property} unit={unit} />
      </div>
    </Layout>
  );
}
