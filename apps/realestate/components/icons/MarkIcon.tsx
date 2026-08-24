import * as React from "react";
import { SVGProps } from "react";
const MarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 2.25H3.417A2.167 2.167 0 0 0 1.25 4.417v15.166a2.167 2.167 0 0 0 2.167 2.167h15.166a2.167 2.167 0 0 0 2.167-2.167V12"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.906 1.844a2.298 2.298 0 0 1 3.25 3.25l-9.764 9.765a2.166 2.166 0 0 1-.924.547l-3.113.91a.542.542 0 0 1-.671-.672l.91-3.112c.102-.349.29-.666.548-.923l9.764-9.765Z"
    />
  </svg>
);
export default MarkIcon;
