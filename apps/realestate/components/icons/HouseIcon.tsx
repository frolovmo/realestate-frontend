import * as React from "react";
import { SVGProps } from "react";

const HouseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.125}
      d="M27.083 4.167 4.167 14.584M25 6.25v39.584H14.583c-3.929 0-5.891 0-7.112-1.221S6.25 41.429 6.25 37.5V14.584m18.75 0L45.833 25"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.125}
      d="M20.833 45.833h14.584c3.929 0 5.891 0 7.112-1.22 1.221-1.222 1.221-3.186 1.221-7.113V23.958"
    />
  </svg>
);

export default HouseIcon;
