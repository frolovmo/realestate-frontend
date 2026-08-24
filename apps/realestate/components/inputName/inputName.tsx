interface InputNameProps {
  children: React.ReactNode;
  isRequired?: boolean;
  htmlFor?: string;
}
export default function InputName({
  isRequired = false,
  htmlFor,
  children,
}: InputNameProps) {
  return (
    <label className="text-softblack text-base" htmlFor={htmlFor}>
      {children}
      {isRequired && <span className="text-red-600"> *</span>}
    </label>
  );
}
