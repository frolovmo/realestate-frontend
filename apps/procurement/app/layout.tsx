import "primeicons/primeicons.css";
import "@procurement/styles/globals.css";

export const metadata = {
  title: "Procurement",
  description: "Procurement - Providing solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
