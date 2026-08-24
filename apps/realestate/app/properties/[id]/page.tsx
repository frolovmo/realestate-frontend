import HeadingBar from "@/components/headingBar/headingBar";
import { Button } from "../../../components/ui/button";
import PropertiesIdMain from "@/components/singlePropertyLayout/propertiesIdMain";
import { PlusIcon } from "@/components/icons";
import Link from "next/link";
import Layout from "@/components/layouts/sidebar";
import { notFound } from "next/navigation";
import fetchPropertyById from "@/actions/fetchPropertyByid";
import { basePath } from "@/lib/constants";
import fetchPropertyViews from "@/actions/fetchPropertyViews";
import { PencilIcon } from "lucide-react";
import { EditPropertyStatuses } from "@/lib/constants/properties";
import { PropertyStatus } from "@/lib/types/properties";
import DeletePropertyDialog from "@/components/DeletePropertyDialog";

export default async function PropertyIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const property = await fetchPropertyById(id);

  if (!property) {
    notFound();
  }

  const propertyViews = await fetchPropertyViews(property.identifier);

  const showEditButton = EditPropertyStatuses.includes(
    property.status as PropertyStatus
  );

  return (
    <Layout>
      <div className="w-full h-full">
        <HeadingBar heading="My Properties > Single Property">
          <div className="flex items-center gap-4">
            <DeletePropertyDialog
              identifier={property.identifier}
              name={property.name}
            />

            {showEditButton && (
              <Link href={`${basePath}/properties/${id}/edit`}>
                <Button variant="outline">
                  <PencilIcon className="mr-2 text-base w-[16px] h-[16px]" />
                  Edit Property
                </Button>
              </Link>
            )}

            <Link href={`${basePath}/properties/${id}/create-unit`}>
              <Button>
                <PlusIcon className="mr-2 text-white" />
                New Unit
              </Button>
            </Link>
          </div>
        </HeadingBar>
        <div className="rounded-b-3xl border bg-white p-4">
          <PropertiesIdMain property={property} propertyViews={propertyViews} />
        </div>
      </div>
    </Layout>
  );
}
