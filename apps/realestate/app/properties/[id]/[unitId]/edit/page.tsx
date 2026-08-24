import React from "react";
import fetchPropertyById from "@/actions/fetchPropertyByid";
import CreateUnitForm from "@/components/createUnit/createUnitForm";
import HeadingBar from "@/components/headingBar/headingBar";
import Layout from "@/components/layouts/sidebar";
import { EditUnitStatuses, UnitStatus } from "@/lib/constants/units";
import { PropertyData, UnitData } from "@/lib/types";
import DeleteUnitDialog from "@/components/DeleteUnitDialog";

const EditUnitPage = async ({
  params,
}: {
  params: { id: string; unitId: string };
}) => {
  const { id: propertyId, unitId } = params || {};

  const property = await fetchPropertyById(propertyId);

  const unit = property?.units.find((unit) => unit.identifier === unitId);

  const getErrorMessage = (property: PropertyData | null, unit?: UnitData) => {
    if (!property) {
      return "Property does not exists";
    }

    if (!unit) {
      return "Unit does not exists";
    }

    if (!EditUnitStatuses.includes(unit.status as UnitStatus)) {
      return `Unit with status "${property.status}" cannot be edited`;
    }

    return null;
  };

  const errorMessage = getErrorMessage(property, unit);

  const heading = `My Properties > ${property ? property.name : "No Data"} > ${
    unit ? unit.name : "No Data"
  }`;

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
        {!errorMessage && property ? (
          <CreateUnitForm
            isEditMode
            propertyId={propertyId}
            property={property}
            unit={unit}
          />
        ) : (
          <div className="flex items-center justify-between px-6 py-9 border rounded-b-3xl">
            <h1>{errorMessage}</h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditUnitPage;
