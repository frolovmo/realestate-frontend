import Link from "next/link";

import IzeTechLogo from "../brand/IzeTechLogo";
import Footer from "../landing/footer";
import LoginSlider from "../sliders/loginSlider";
import { basePath } from "../../lib/constants";

type AuthPageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: AuthPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="brand-grid relative flex-1 overflow-hidden bg-background px-4 py-16 sm:px-8 lg:py-24">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[430px] w-[430px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="surface-panel relative mx-auto grid min-h-[700px] w-full max-w-6xl overflow-hidden lg:grid-cols-[46%_54%]">
          <section className="flex flex-col p-7 sm:p-10 lg:p-12">
            <Link href={`${basePath}/`} className="mb-12 w-fit">
              <IzeTechLogo
                productLabel="Real Estate"
                className="text-[34px]"
              />
            </Link>

            <div className="mb-9">
              <span className="brand-kicker mb-4">{eyebrow}</span>
              <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            <div className="flex-1">{children}</div>

            <p className="mt-10 text-xs text-muted-foreground">
              Secure platform technology powered by{" "}
              <a
                href="https://izetech.org/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-secondary hover:text-googlelink"
              >
                IZE Tech
              </a>
            </p>
          </section>

          <aside className="hidden min-h-full bg-secondary lg:block">
            <LoginSlider />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
