import * as React from "react";
import { SVGProps } from "react";
const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={6}
    fill="none"
    {...props}
  >
    <path fill="#000" d="m.727.5 5 5 5-5h-10Z" />
  </svg>
);
export default ChevronIcon;
