import * as React from "react";
import { SVGProps } from "react";
const LocatorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill="#707070"
      fillRule="evenodd"
      d="M3.287 7.656a4.156 4.156 0 1 1 8.313 0 4.156 4.156 0 0 1-8.313 0Zm4.156-2.843a2.844 2.844 0 1 0 0 5.687 2.844 2.844 0 0 0 0-5.688Z"
      clipRule="evenodd"
    />
    <path
      fill="#707070"
      fillRule="evenodd"
      d="M.027 6.656A7.254 7.254 0 0 1 7.254 0h.378a7.254 7.254 0 0 1 7.228 6.656 7.822 7.822 0 0 1-1.742 5.597L8.924 17.38a1.914 1.914 0 0 1-2.962 0l-4.194-5.128A7.822 7.822 0 0 1 .027 6.656Zm7.227-5.343a5.941 5.941 0 0 0-5.918 5.45 6.51 6.51 0 0 0 1.449 4.658l4.193 5.13a.601.601 0 0 0 .931 0l4.194-5.13a6.51 6.51 0 0 0 1.447-4.657 5.941 5.941 0 0 0-5.919-5.452h-.377Z"
      clipRule="evenodd"
    />
  </svg>
);
export default LocatorIcon;
