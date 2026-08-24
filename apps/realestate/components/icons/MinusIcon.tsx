import * as React from "react";
import { SVGProps } from "react";
const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={3}
    fill="currentColor"
    {...props}
  >
    <path d="M14 2.498H0v-2h14v2Z" />
  </svg>
);
export default MinusIcon;
