import HeadingBar from "@/components/headingBar/headingBar";
import PropertiesMain from "@/components/propertiesLayout/propertiesMain";
import { Button } from "../../components/ui/button";
import { PlusIcon } from "@/components/icons";
import Link from "next/link";
import Layout from "@/components/layouts/sidebar";
import fetchProperties from "../../actions/fetchProperties";
import { basePath } from "../../lib/constants";
import { getUserData } from "../../actions/auth";

export const fetchCache = "force-no-store";

interface ISearchParams {
  page?: string;
  limit?: string;
  unitType?: string;
  unitIdentifier?: string;
  developmentStage?: string;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const user = await getUserData();
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "2", 10);
  const unitType = searchParams?.unitType;
  const unitIdentifier = searchParams?.unitIdentifier;
  const developmentStage = searchParams?.developmentStage;

  const propertiesList = await fetchProperties({
    page,
    limit,
    unitType,
    unitIdentifier,
    developmentStage,
    userId: user?.userId as number,
  });

  return (
    <Layout>
      <main className="w-full h-full">
        <HeadingBar heading="My Properties">
          <Link href={`${basePath}/properties/create-property`}>
            <Button>
              <PlusIcon className="mr-2 text-white" />
              New Property
            </Button>
          </Link>
        </HeadingBar>
        <div className="rounded-b-3xl border bg-white p-4">
          <PropertiesMain propertiesList={propertiesList} />
        </div>
      </main>
    </Layout>
  );
}
