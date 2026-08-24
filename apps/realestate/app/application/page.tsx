import { fetchTopProperties } from "../../actions/fetchTopProperties";
import ApplicationRequest from "@/components/applicationRequest/applicationRequest";
import HeadingBar from "@/components/headingBar/headingBar";
import Layout from "@/components/layouts/sidebar";
import fetchApplication from "@/actions/fetchApplication";
import RecommendationSearch from "@/components/recommendationSearch/recommendationSearch";
import { PropertiesListResponseData } from "../../lib/types/index";

export default async function ApplicationPage() {
  const { applicationDataFromApiV1, applicationDataFromNewApi } =
    await fetchApplication();

  const properties: PropertiesListResponseData = await fetchTopProperties({
    excludedApplicationId: applicationDataFromApiV1?.id,
  });
  const { data } = properties;
  const units = data?.flatMap((property) => property.units);

  const hasV1 = !!applicationDataFromApiV1;
  const hasNew = !!applicationDataFromNewApi;

  const application: any = hasV1 || hasNew
    ? {
        ...(applicationDataFromApiV1 || {}),
        ...(applicationDataFromNewApi?.property && { property: applicationDataFromNewApi.property }),
        ...(applicationDataFromNewApi?.unit && { unit: applicationDataFromNewApi.unit }),
      }
    : null;

  return (
    <Layout>
      <main className="w-full h-full">
        <HeadingBar heading="My Application" />

        <div className="rounded-b-3xl border bg-white p-4">
          <ApplicationRequest application={application} />
          <div className="border-b border-graytext mt-12 mb-9"></div>
          <RecommendationSearch units={units} />
        </div>
      </main>
    </Layout>
  );
}
