import { PropertyData, PropertyViews } from "../../lib/types/index";
import Applicants from "./applicants";
import AvailableUnits from "./availableUnits";
import PropertyCard from "./propertyCard";
import PropertyDetails from "./propertyDetails";

interface PropertiesIdMainProps {
  property: PropertyData;
  propertyViews: PropertyViews;
}

export default function PropertiesIdMain({
  property,
  propertyViews,
}: PropertiesIdMainProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white rounded-md p-6 md:p-9 w-full h-auto">
      <div className="w-full md:w-auto">
        <PropertyCard property={property} propertyViews={propertyViews} />
      </div>

      <div className="flex flex-col gap-8 flex-1">
        <PropertyDetails property={property} />
        <AvailableUnits
          units={property.units}
          propertyId={property.identifier}
        />
        <Applicants applicants={property.applications} />
      </div>
    </div>
  );
}
