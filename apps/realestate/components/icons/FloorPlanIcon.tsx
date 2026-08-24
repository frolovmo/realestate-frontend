import * as React from "react";
import { SVGProps } from "react";
const FloorPlanIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    fill="currentColor"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.087}
      d="M7 12.676c-2.75 0-4.125 0-4.98-.854-.853-.854-.853-2.23-.853-4.979 0-2.75 0-4.125.854-4.98C2.876 1.01 4.25 1.01 7 1.01s4.125 0 4.979.854c.854.855.854 2.23.854 4.98 0 2.749 0 4.124-.854 4.978-.476.476-1.115.687-2.063.78"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.087}
      d="M7 12.676A2.917 2.917 0 0 1 9.916 9.76m-8.75-4.667h7m2.334 0h2.333M5.25 12.676V5.093m0-2.333V1.01"
    />
  </svg>
);
export default FloorPlanIcon;
