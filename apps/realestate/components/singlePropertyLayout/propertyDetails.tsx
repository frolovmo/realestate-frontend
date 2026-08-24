import { PropertyData } from "@/lib/types";

const Title = ({ children }: { children: React.ReactNode }) => (
  <p className="font-poppins text-sm text-lightdark">{children}</p>
);

const Description = ({ children }: { children: React.ReactNode }) => (
  <p className="font-poppins text-lg font-medium text-black">{children}</p>
);

interface PropertyDetailsProps {
  property: PropertyData;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const { name, identifier, description, sector, district, province } =
    property;
  return (
    <div className="flex-1 p-4 border border-grayborder rounded-extra">
      <div className="flex gap-[60px] items-center mb-8 flex-wrap">
        <div>
          <Title>Property Name</Title>
          <Description>{name}</Description>
        </div>

        <div>
          <Title>Identifier</Title>
          <Description>{identifier}</Description>
        </div>

        <div>
          <Title>Category</Title>
          <Description>Residential</Description>
        </div>

        <div>
          <Title>Address</Title>
          <Description>{`${sector}, ${district}, ${province}, Rwanda`}</Description>
        </div>
      </div>

      <div className="font-poppins text-sm">
        <Title>Description</Title>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
}
