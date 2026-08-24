import * as React from "react";
import { SVGProps } from "react";
const CashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M3.75 26.25h32.5c.69 0 1.25-.56 1.25-1.25V7.5c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25.56-1.25 1.25V25c0 .69.56 1.25 1.25 1.25Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 30h30M7.5 33.75h25M20 22.5A6.25 6.25 0 1 0 20 10a6.25 6.25 0 0 0 0 12.5ZM37.5 12.5a6.25 6.25 0 0 1-6.25-6.25M2.5 12.5a6.25 6.25 0 0 0 6.25-6.25M37.5 20a6.25 6.25 0 0 0-6.25 6.25M2.5 20a6.25 6.25 0 0 1 6.25 6.25"
    />
  </svg>
);
export default CashIcon;
