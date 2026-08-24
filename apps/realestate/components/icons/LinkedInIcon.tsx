import * as React from "react";
import { SVGProps } from "react";
const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeWidth={1.6}
      d="M7.2 9.6v8m9.6 0v-4a3.2 3.2 0 1 0-6.4 0v4-8m-4-2.4H8M2.4.8h19.2a1.6 1.6 0 0 1 1.6 1.6v19.2a1.6 1.6 0 0 1-1.6 1.6H2.4a1.6 1.6 0 0 1-1.6-1.6V2.4A1.6 1.6 0 0 1 2.4.8Z"
    />
  </svg>
);
export default LinkedInIcon;
