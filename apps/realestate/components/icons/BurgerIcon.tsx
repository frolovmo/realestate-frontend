import * as React from "react";
import { SVGProps } from "react";
const BurgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21.5 8a.875.875 0 0 1-.875.875H1.375a.875.875 0 0 1 0-1.75h19.25A.875.875 0 0 1 21.5 8ZM1.375 1.875h19.25a.875.875 0 1 0 0-1.75H1.375a.875.875 0 0 0 0 1.75Zm19.25 12.25H1.375a.875.875 0 0 0 0 1.75h19.25a.875.875 0 1 0 0-1.75Z"
    />
  </svg>
);
export default BurgerIcon;
