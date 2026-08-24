import { InputFields } from "@procurement/types";
import { TextInput } from "@procurement/components/common/form";

const inputsFields: InputFields[] = [
  {
    id: "bank",
    name: "bank",
    label: "Bank Name",
    placeholder: "Your Bank Name",
    width: "w-[48%]",
    icon: "pi pi-warehouse",
  },
  {
    id: "accountNumber",
    name: "accountNumber",
    label: "Account Number",
    placeholder: "xxxxxxxx",
    width: "w-[48%]",
  },
  {
    id: "accountName",
    name: "accountName",
    label: "Account Name",
    placeholder: "account name",
    width: "w-[48%]",
    icon: "pi pi-envelope",
  },
  {
    id: "currency",
    name: "currency",
    label: "Currency",
    placeholder: "RWF",
    width: "w-[48%]",
    icon: "pi pi-dollar",
  },
];

export const BankInfo: React.FC = () => {
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
