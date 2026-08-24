import { fetchRequest } from "../../../actions/fetchRequest";
import { getUserData } from "../../../actions/auth";
import HeadingBar from "@/components/headingBar/headingBar";
import Layout from "@/components/layouts/sidebar";
import UnitDetails from "@/components/unitDetails/unitDetails";

export default async function RequestPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const unit = await fetchRequest(id);
  const user = await getUserData();
  return (
    <Layout>
      <div className="w-full h-full">
        <HeadingBar heading="Requests" />
        <div className="rounded-b-3xl border bg-white p-4">
          <UnitDetails unit={unit} user={user} />
        </div>
      </div>
    </Layout>
  );
}
