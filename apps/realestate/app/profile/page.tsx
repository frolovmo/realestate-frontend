import { getUserData } from "@/actions/auth";
import Layout from "@/components/layouts/sidebar";
import ProfileClientComponent from "@/components/profile/ProfileClientComponent";

export default async function ProfilePage() {
  const user = await getUserData();

  return (
    <Layout>
      <ProfileClientComponent user={user} />
    </Layout>
  );
}
