import * as React from "react";
import { SVGProps } from "react";
const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="currentColor"
    {...props}
  >
    <path d="M6.5 6V0h2v6h6v2h-6v6h-2V8h-6V6h6Z" />
  </svg>
);
export default PlusIcon;
