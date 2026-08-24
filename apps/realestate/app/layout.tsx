import "@/styles/globals.css";
import "@/styles/loginSlider.css";
import "@/styles/reviewSlider.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import { Suspense } from "react";
import { basePath } from "../lib/constants";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const poppinsRegular = localFont({
  src: "./fonts/PoppinsRegularWebfont.woff",
  variable: "--font-poppins-regular",
  weight: "100 900",
});

const notoSansRegular = localFont({
  src: "./fonts/NotoSansRegularWebfont.woff",
  variable: "--font-notoSans-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "IZE Tech Real Estate",
    template: "%s | IZE Tech Real Estate",
  },
  description:
    "A secure, accessible real estate and affordable housing platform powered by IZE Tech.",
  icons: {
    icon: `${basePath}/ize-tech-mark.svg`,
    shortcut: `${basePath}/ize-tech-mark.svg`,
    apple: `${basePath}/ize-tech-mark.svg`,
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegular.variable} ${notoSansRegular.variable} ${poppins.className} antialiased`}
      >
        <Providers>
          <Suspense>{children}</Suspense>
          <Suspense>{modal}</Suspense>
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
