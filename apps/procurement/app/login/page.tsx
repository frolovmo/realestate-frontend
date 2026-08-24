import { Button } from "primereact/button";
import Link from "next/link";
import { Form, TextInput } from "@procurement/components/common/form";
import AuthLayout from "@procurement/app/authLayout";

export default function Index() {
  return (
    <AuthLayout>
      <Form
        title="Login to your account"
        description="Enter your details to log into your account"
      >
        {/* input fields */}
        <div className="w-full">
          <TextInput
            icon="pi pi-envelope"
            id="email"
            label="Email"
            iconPosition="left"
            placeholder="m.example@company.com"
          />
          <TextInput
            icon="pi pi-lock"
            id="password"
            label="Password"
            iconPosition="left"
            placeholder="Password@12"
            type="password"
          />
        </div>
        <div className="w-full my-2">
          <Link
            href="forgot-password?"
            className="text-sm font-medium text-lightdark hover:text-softblack"
          >
            Forget password
          </Link>
        </div>
        <Button
          label="Login"
          className="p-button-sm text-lightgray px-6 py-1 rounded-md w-full mt-3"
          style={{ backgroundColor: "#166534", borderColor: "#166534" }}
        />
      </Form>
    </AuthLayout>
  );
}
