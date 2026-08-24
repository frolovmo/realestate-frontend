import { basePath } from "@procurement/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main
        style={{
          backgroundImage: `url(${basePath}/images/auth-vector.png)`,
        }}
        className="bg-foreground bg-cover bg-no-repeat bg-center w-screen min-h-screen flex flex-col items-center justify-center p-8"
      >
        {children}
      </main>
    </div>
  );
}
