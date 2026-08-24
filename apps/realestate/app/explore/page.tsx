import MainLayout from "../../components/layouts/main";
import SearchMain from "./searchMain";
import {
  provincesOptions,
  districtsOptions,
  sectorsOptions,
  cellsOptions,
} from "./extractLocationUnits";
import { isApplicantRole } from "@/actions/auth";
import fetchApplication from "@/actions/fetchApplication";

export default async function ExplorePage() {
  const isApplicant = await isApplicantRole();

  const application = isApplicant ? await fetchApplication() : null;

  return (
    <MainLayout>
      <SearchMain
        locationSelectOptions={{
          provincesOptions,
          districtsOptions,
          sectorsOptions,
          cellsOptions,
        }}
        applicationId={application?.applicationDataFromApiV1?.id}
      />
    </MainLayout>
  );
}
