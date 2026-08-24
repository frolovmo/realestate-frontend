import { InputFields } from "@procurement/types";
import { TextInput } from "@procurement/components/common/form";

const inputsFields: InputFields[] = [
  {
    id: "tin",
    name: "tin",
    label: "TIN",
    placeholder: "Company TIN number",
    width: "w-full",
    icon: "pi pi-warehouse",
  },
  {
    id: "company",
    name: "company",
    label: "Company Name",
    placeholder: "Your Company Name",
    width: "w-[48%]",
    icon: "pi pi-warehouse",
  },
  {
    id: "category",
    name: "category",
    label: "Category",
    placeholder: "Category",
    width: "w-[48%]",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "m.example@company.com",
    width: "w-[48%]",
    icon: "pi pi-envelope",
  },
  {
    id: "phoneNumber",
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "+250 xxx xxx xxx",
    width: "w-[48%]",
    icon: "pi pi-phone",
  },
  {
    id: "director",
    name: "director",
    label: "Managing Director",
    placeholder: "Full Name",
    width: "w-[48%]",
    icon: "pi pi-user",
  },
  {
    id: "id",
    name: "id",
    label: "Identification Card Number",
    placeholder: "ID",
    width: "w-[48%]",
    icon: "pi pi-user",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    placeholder: "",
    width: "w-[48%]",
    icon: "pi pi-lock",
  },
  {
    id: "confirm-password",
    name: "confirm-password",
    label: "Confirm Password",
    placeholder: "",
    width: "w-[48%]",
    icon: "pi pi-lock",
  },
];

export const CompanyInfo: React.FC = () => {
  return (
    <div className="w-full flex flex-wrap justify-between">
      {inputsFields.map((input, index) => (
        <div key={index} className={`w-full sm:${input.width} mt-3`}>
          <TextInput
            id={input.id}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            icon={input.icon ?? "pi"}
          />
        </div>
      ))}
    </div>
  );
};
