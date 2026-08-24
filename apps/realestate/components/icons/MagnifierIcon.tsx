import * as React from "react";
import { SVGProps } from "react";
const MagnifierIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19 19-6-6M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"
    />
  </svg>
);
export default MagnifierIcon;
