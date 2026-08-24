"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { topMenu } from "../../app/data/menu";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { basePath } from "@procurement/lib/constants";

const NavContent: React.FC<{
  router: AppRouterInstance;
  setVisible: (args: boolean) => void;
}> = ({ router, setVisible }) => {
  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href={`${basePath}/`} className="flex items-center">
        <Image
          src="/images/brd-logo.svg"
          alt="BRD Logo"
          width={80}
          height={30}
          className="h-8 w-auto"
        />
      </Link>
      <div className="flex items-center space-x-3 gap-6">
        <nav className="hidden md:flex items-center space-x-6">
          {topMenu.map((item, index) => (
            <Link
              key={index}
              href={item.link as string}
              className="text-sm font-medium text-softblack hover:text-lightdark"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Button
            label="Login"
            className="p-button-outlined p-button-sm rounded-md px-6 py-1 bg-white border-[#166534] border"
            onClick={() => router.push(`${basePath}/login`)}
          />
          <Button
            label="Register"
            className="p-button-sm text-lightgray px-6 py-1 rounded-md"
            style={{ backgroundColor: "#166534", borderColor: "#166534" }}
            onClick={() => router.push(`${basePath}/register`)}
          />
        </div>
        <div
          className="block md:hidden hover:shadow-lg transition duration-300 ease-in-out rounded-lg px-2 cursor-pointer"
          onClick={() => setVisible(true)}
        >
          {/* adding the menu icon */}
          <i className="pi pi-bars text-[1.6rem]" />
        </div>
      </div>
    </div>
  );
};

export const NavBar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <header className="border-b shadow-sm fixed top-0 left-0 right-0 z-10 bg-background/80 bg-opacity-20">
      <NavContent router={router} setVisible={setVisible} />
      <Dialog
        // header={null}
        // closable={false}
        visible={visible}
        position="top-right"
        style={{ width: "100vw" }}
        modal
        dismissableMask
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        content={({ hide }) => (
          <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-between bg-lightgray">
            <div className="flex items-center justify-between w-full border-b shadow-sm py-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/brd-logo.svg"
                  alt="BRD Logo"
                  width={80}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
              <div
                className="block md:hidden hover:shadow-lg transition duration-300 ease-in-out rounded-lg px-2 cursor-pointer"
                onClick={() => setVisible(false)}
              >
                {/* adding the menu icon */}
                <i className="pi pi-times text-[1.6rem]" />
              </div>
            </div>
            <div className="flex flex-col items-center space-x-3 gap-6">
              <nav className="flex flex-col items-center w-full py-4">
                {topMenu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link as string}
                    className="text-md font-medium text-softblack hover:text-lightdark my-2"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-6">
                <Button
                  label="Login"
                  className="p-button-outlined p-button-sm rounded-md px-6 py-1 bg-white border-[#166534] border"
                  onClick={() => router.push("/login")}
                />
                <Button
                  label="Register"
                  className="p-button-sm text-lightgray px-6 py-1 rounded-md"
                  style={{ backgroundColor: "#166534", borderColor: "#166534" }}
                  onClick={() => router.push("/register")}
                />
              </div>
            </div>
          </div>
        )}
        // draggable={false}
        // resizable={false}
      ></Dialog>
    </header>
  );
};
