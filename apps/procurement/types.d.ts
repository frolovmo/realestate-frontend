import { PropsWithChildren } from "react";
import { InputTextProps } from "primereact/inputtext";

export interface FormProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export interface InputPros extends InputTextProps {
  icon?: string;
  error?: string;
  id: string;
  label: string;
  iconPosition?: "left" | "right";
}

export interface InputFields extends InputPros {
  width: string;
}
