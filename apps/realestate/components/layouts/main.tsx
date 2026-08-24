import { getUserData } from "../../actions/auth";
import Footer from "../../components/landing/footer";
import Header from "../../components/landing/header";
import { UserData } from "../../lib/types/index";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData();
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user as UserData} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
