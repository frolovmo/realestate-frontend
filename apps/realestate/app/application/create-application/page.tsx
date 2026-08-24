import {
  extractUserDataFromJwt,
  getAuthentication,
} from "../../../actions/auth";
import CreateApplicationForm from "@/components/createApplication/createApplicationForm";
import HeadingBar from "@/components/headingBar/headingBar";
import Layout from "@/components/layouts/sidebar";
import {
  JwtDecodedData,
  PropertiesListResponseData,
} from "../../../lib/types/index";
import fetchPropertiesWithApprovedUnits from "@/actions/fetchPropertiesWithApprovedUnits";
import fetchMetaForApplicationFields from "@/actions/fetchMetaForApplicationFields";

export default async function ApplicationFormPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const data = await extractUserDataFromJwt();
  const metadataForFields = await fetchMetaForApplicationFields();
  const properties: PropertiesListResponseData =
    await fetchPropertiesWithApprovedUnits();
  const token = (await getAuthentication())?.value || "";

  const { unitId, properyId } = searchParams || {};

  return (
    <Layout>
      <main className="w-full h-full">
        <HeadingBar heading="My Application" />
        <div className="rounded-b-3xl border bg-white p-4">
          <CreateApplicationForm
            profileInfo={data as JwtDecodedData}
            authToken={token}
            properties={properties}
            metadataForFields={metadataForFields}
            unitId={unitId}
            propertyId={properyId}
          />
        </div>
      </main>
    </Layout>
  );
}
