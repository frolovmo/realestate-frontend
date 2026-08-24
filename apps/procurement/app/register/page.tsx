"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Form } from "@procurement/components/common/form";
import AuthLayout from "@procurement/app/authLayout";
import { CompanyInfo } from "@procurement/components/register/companyInfo";
import { BankInfo } from "@procurement/components/register/bankInfo";
import { CompanyLocation } from "@procurement/components/register/companyLocation";

enum RegistrationSteps {
  INFO,
  LOCATION,
  BANK,
}

export default function Index() {
  const [currentStep, setCurrentStep] = useState<RegistrationSteps>(
    RegistrationSteps.INFO
  );
  const [screenInfo, setScreenInfo] = useState<{
    title: string;
    description: string;
  }>({
    title: "Create Account",
    description: "Enter your details to register your company",
  });

  const steps = useCallback(() => {
    switch (currentStep) {
      case RegistrationSteps.INFO:
        return <CompanyInfo />;

      case RegistrationSteps.LOCATION:
        return <CompanyLocation />;

      case RegistrationSteps.BANK:
        return <BankInfo />;

      default:
        return <CompanyInfo />;
    }
  }, [currentStep]);

  const onSubmit = () => {
    switch (currentStep) {
      case RegistrationSteps.INFO:
        setCurrentStep(RegistrationSteps.LOCATION);
        setScreenInfo({
          title: "Create Company Account",
          description: "Enter your company bank details",
        });
        break;
      case RegistrationSteps.LOCATION:
        setCurrentStep(RegistrationSteps.BANK);
        setScreenInfo({
          title: "Create Company Account",
          description: "Enter details to register your company",
        });
    }
  };

  return (
    <AuthLayout>
      <Form title={screenInfo.title} description={screenInfo.description}>
        {steps()}
        <div className="w-full my-4">
          <p className="text-sm font-medium text-lightdark">
            By registering, you agree to{" "}
            <Link href="terms" className="text-secondary hover:font-semibold">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link href="privacy" className="text-secondary hover:font-semibold">
              Privacy Policy
            </Link>
          </p>
        </div>
        <Button
          label="Continue"
          className="p-button-sm text-lightgray px-6 py-1 rounded-md w-full mt-3"
          style={{ backgroundColor: "#166534", borderColor: "#166534" }}
          onClick={onSubmit}
        />
        <div className="w-full my-4">
          <p className="text-sm font-medium text-lightdark text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-secondary hover:font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
}
