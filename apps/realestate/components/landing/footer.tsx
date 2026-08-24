import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import IzeTechLogo from "../brand/IzeTechLogo";
import { basePath } from "../../lib/constants";

export default function Footer() {
  return (
    <footer className="border-t-4 border-primary bg-secondary px-6 py-10 text-white sm:px-12 lg:px-[82px] lg:py-14">
      <div className="mx-auto grid max-w-[1500px] gap-10 border-b border-white/15 pb-10 md:grid-cols-2">
        <section>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Technology powered by
          </p>
          <Link
            href="https://izetech.org/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit IZE Tech"
          >
            <IzeTechLogo inverse className="text-[50px]" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Secure digital systems designed for trusted, accessible housing
            services.
          </p>
        </section>

        <section>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Contact us
          </p>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                <Mail aria-hidden="true" size={21} strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase text-white/65">
                  Email us
                </p>
                <a
                  className="text-lg font-semibold text-white transition-colors hover:text-primary"
                  href="mailto:admin@izetech.org"
                >
                  admin@izetech.org
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                <Phone aria-hidden="true" size={21} strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase text-white/65">
                  South Africa
                </p>
                <a
                  className="text-lg font-semibold text-white transition-colors hover:text-primary"
                  href="tel:+27728344940"
                >
                  +27 72 834 4940
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                <Phone aria-hidden="true" size={21} strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase text-white/65">
                  Rwanda
                </p>
                <a
                  className="text-lg font-semibold text-white transition-colors hover:text-primary"
                  href="tel:+250791702288"
                >
                  +250 791 702 288
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 pt-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} IZE Tech. Real Estate platform.</p>
        <div className="flex gap-7">
          <Link href={`${basePath}/terms`} className="hover:text-primary">
            Terms and conditions
          </Link>
          <Link href={`${basePath}/cookies`} className="hover:text-primary">
            Cookies
          </Link>
          <Link
            href="https://izetech.org/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            izetech.org
          </Link>
        </div>
      </div>
    </footer>
  );
}
