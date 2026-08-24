"use client";
import {
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useClipboard from "../../lib/hooks/useClipboard";

export default function ShareUnit({ unitFullUrl }: { unitFullUrl: string }) {
  const [isCopied, setCopied] = useClipboard(unitFullUrl);

  const socialMediaMeta = [
    {
      text: "WhatsApp",
      icon: <WhatsAppIcon />,
      href: `https://wa.me/?text=${encodeURIComponent(
        `Check this unit: ${unitFullUrl}`
      )}`,
    },
    {
      text: "Email",
      icon: <EmailIcon />,
      href: `mailto:?subject=Check this unit&body=${encodeURIComponent(
        unitFullUrl
      )}`,
    },
    {
      text: "X",
      icon: <XIcon />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        unitFullUrl
      )}&text=${encodeURIComponent("Check this unit")}`,
    },
    {
      text: "LinkedIn",
      icon: <LinkedInIcon />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        unitFullUrl
      )}`,
    },
    {
      text: "Facebook",
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        unitFullUrl
      )}`,
    },
  ];

  return (
    <div className="rounded-extra bg-white p-3 w-[448px] shadow-2xl">
      <p className="text-lg font-medium	text-black mb-4">Share</p>

      <div className="flex flex-col items-center">
        <div className="w-[80%]">
          <div className="flex items-center p-0.5 border border-grayborder rounded-extra mb-7">
            <Button
              variant="default"
              className="w-[134px] h-[33px]"
              onClick={setCopied}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Input
              value={unitFullUrl}
              className="border-none rounded-extra h-[33px] text-sm font-normal"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-lightdark mb-4">
              Or share via
            </p>
            <ul className="!text-black flex flex-col gap-4">
              {socialMediaMeta.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-2 p-0.5 cursor-pointer"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-0.5 cursor-pointer hover:underline"
                  >
                    <span>{item.icon}</span>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
