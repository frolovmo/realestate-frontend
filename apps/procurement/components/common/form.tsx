import Image from "next/image";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { FormProps, InputPros } from "../../types";
import { basePath } from "@procurement/lib/constants";

export const Form: React.FC<FormProps> = ({ children, title, description }) => {
  return (
    <div className="flex flex-col items-center  bg-[#e7f0ec] shadow-md rounded-lg border-2 border-lightgray w-[80%] sm:max-w-[600px] min-w-[350px] py-10 px-6">
      <Link href={`${basePath}/`} className="flex items-center">
        <Image
          src="/images/brd-logo.svg"
          alt="BRD Logo"
          width={80}
          height={30}
          className="h-8 w-auto"
        />
      </Link>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-softblack text-center">
          {title}
        </h2>
        <p className="text-sm text-lightdark text-center">{description}</p>
      </div>
      {children}
    </div>
  );
};

export const TextInput: React.FC<InputPros> = (props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-lightdark text-sm" htmlFor={props.id}>
        {props.label}
      </label>
      <IconField
        iconPosition={props.iconPosition}
        className="border border-999999 rounded-md p-2 mb-2 flex items-center bg-background"
      >
        <InputIcon className={`${props.icon} text-lightdark mr-2 text-sm`}>
          {" "}
        </InputIcon>

        <InputText
          placeholder={props.placeholder}
          type={props.type}
          className="border-none outline-none focus:ring-0 focus:outline-none flex-1 bg-transparent text-sm"
        />
      </IconField>
      {props.error && <small id={`${props.id}-help`}>{props.error}</small>}
    </div>
  );
};
