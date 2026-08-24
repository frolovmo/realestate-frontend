import * as React from "react";
import { SVGProps } from "react";
const CloudIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.4}
      strokeWidth={2}
      d="m31.5 27-8-8-8 8M23.5 19v18"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.4}
      strokeWidth={2}
      d="M40.28 31.78A10 10 0 0 0 35.5 13h-2.52A16.001 16.001 0 1 0 5.5 27.6"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.4}
      strokeWidth={2}
      d="m31.5 27-8-8-8 8"
    />
  </svg>
);
export default CloudIcon;
