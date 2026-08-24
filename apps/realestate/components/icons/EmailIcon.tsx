import * as React from "react";
import { SVGProps } from "react";
const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M1 1V.5a.5.5 0 0 0-.5.5H1Zm18 0h.5a.5.5 0 0 0-.5-.5V1ZM1 1.5h18v-1H1v1ZM18.5 1v12h1V1h-1ZM17 14.5H3v1h14v-1ZM1.5 13V1h-1v12h1ZM3 14.5A1.5 1.5 0 0 1 1.5 13h-1A2.5 2.5 0 0 0 3 15.5v-1ZM18.5 13a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5h-1Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 1 9 9 9-9"
    />
  </svg>
);
export default EmailIcon;
