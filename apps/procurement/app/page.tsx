import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import {
  bottomMenu,
  socialMedialLinks,
  topMenu,
} from "@procurement/app/data/menu";
import {
  FeatureCard,
  ReasonsCard,
  StepsCard,
} from "@procurement/components/home/cards";
import { benefits, features, steps } from "./data/card";
import { NavBar } from "../components/common/navBar";
import { basePath } from "@procurement/lib/constants";

export default function Index() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <NavBar />
        {/* main */}
        <main
          style={{
            backgroundImage: `url(${basePath}/images/main-vector.png)`,
          }}
          className={`bg-cover bg-no-repeat bg-center bg-fixed mt-20`}
        >
          <div className="upper-container w-full">
            <div
              id="heroes "
              className="container min-h-[calc(100vh-90px)] md:flex items-center justify-between p-4 mx-auto px-4 flex-grow"
            >
              {/* <div className="md:flex items-center justify-between p-4 h-full"> */}
              <div className="md:w-1/2 max-w-[560px] flex flex-col items-center justify-between h-full">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-sucess to-primary bg-clip-text text-transparent">
                  Access BRD Tenders & Procurement Opportunities
                </h1>
                <p className="mt-4 text-lg text-softblack">
                  Your gateway to business opportunities with the Development
                  Bank of Rwanda. Browse active tenders, submit proposals, and
                  track your applications all in one place.
                </p>
                <div className="mt-6 md:mt-12 l:mt:20 w-full">
                  <Button
                    label="Get Started"
                    className="p-button-sm text-white p-2 rounded-md mr-2 border"
                    iconPos="right"
                    icon="pi pi-arrow-right"
                    style={{
                      backgroundColor: "#166534",
                      borderColor: "#166534",
                    }}
                  />
                  <Button
                    label="View active tenders"
                    className="p-button-outlined p-button-sm rounded-md p-2 border-[#166534] border ml-2"
                  />
                </div>
              </div>
              <div className="col-12 md:col-6 overflow-hidden">
                <Image
                  src={`${basePath}/images/hero-image.svg`}
                  alt="Tugane Digital Banking"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* </div> */}
            </div>
          </div>
          <div
            id="features"
            className="container flex flex-col mx-auto px-4 py-8 justify-center items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                Key Features
              </h2>
              <p className="mt-4 text-sm text-lightdark text-center">
                Everything you need to participate in BRD procurement processes
                efficiently and transparently.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 sm:px-20 lg:px-28 place-items-center mt-8 max-w-7xl">
              {features.map((item, index) => (
                <FeatureCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  iconSize="1.6rem"
                />
              ))}
            </div>
          </div>
          <div
            id="steps"
            style={{
              backgroundImage: `url(${basePath}/images/steps-vector.png)`,
            }}
            className={`bg-[#035427] bg-cover bg-no-repeat bg-center`}
          >
            <div className="container flex flex-col mx-auto px-4 py-8 justify-center items-center">
              <div>
                <h2 className="text-3xl font-bold text-lightgray text-center">
                  How It Works
                </h2>
                <p className="mt-4 text-sm text-lightgray text-center">
                  Get started with BRD procurement in four simple steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 sm:px-20 place-items-center mt-8 max-w-7xl">
                {steps.map((item, index) => (
                  <StepsCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={
                      <span className="w-4 h-4 flex flex-col items-center justify-center text-lightgray">
                        {index + 1}
                      </span>
                    }
                    steps={((index + 1) / steps.length) * 100}
                  />
                ))}
              </div>
            </div>
          </div>
          <div id="reasons">
            <div className="container flex flex-col mx-auto px-4 py-8 justify-center items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                  Why Choose BRD Procurement
                </h2>
                <p className="mt-4 text-sm text-lightdark text-center">
                  Experience the advantages of our digital procurement platform.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-5 py-4 sm:px-20 lg:px-28 justify-center mt-8 max-w-7xl">
                {benefits.map((item, index) => (
                  <ReasonsCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    iconSize="1.5rem"
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            id="get_started"
            style={{
              backgroundImage: `url(${basePath}/images/steps-vector.png)`,
            }}
            className={`bg-[#035427] bg-cover bg-no-repeat bg-center`}
          >
            <div className="container flex flex-col mx-auto px-4 py-8 justify-center items-center">
              <div>
                <h2 className="text-3xl font-bold text-lightgray text-center">
                  Ready to Get Started?
                </h2>
                <p className="mt-4 text-sm text-lightgray text-center">
                  Join hundreds of suppliers working with the Development Bank
                  of Rwanda
                </p>
              </div>
              <div className="flex m-8 justify-center items-center round-sm p-4 gap-4">
                {[{ title: "Crate Account" }, { title: "Contact support" }].map(
                  (t, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center bg-lightgray rounded-md p-2 cursor-pointer"
                    >
                      <p className="text-md text-gray-600 text-center">
                        {t.title}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/brd-logo.svg"
                alt="BRD Logo"
                width={80}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <div className="my-2">
              <p className="text-sm text-darkneutral">
                &copy; {new Date().getFullYear()} Development Bank of Rwanda.
                All rights reserved.
              </p>
            </div>
            <nav className="flex items-center space-x-6 my-2">
              {bottomMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.link as string}
                  className="text-sm font-medium text-darkneutral hover:text-gray-900"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-nowrap items-center space-x-6">
              {socialMedialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.link as string}
                  className="text-sm font-medium text-darkneutral hover:text-gray-900"
                >
                  <span
                    className={item.icon}
                    style={{ color: "#035427", fontSize: "1.3rem" }}
                  />
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
