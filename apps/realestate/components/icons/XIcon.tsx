import * as React from "react";
import { SVGProps } from "react";
const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M11.808 8.469 18.88 0h-1.676l-6.142 7.353L6.158 0H.5l7.418 11.12L.5 20h1.676l6.486-7.765L13.842 20H19.5L11.808 8.469Zm-2.296 2.748L8.76 10.11 2.78 1.3h2.575l4.826 7.11.751 1.107 6.273 9.242h-2.574l-5.119-7.542Z"
    />
  </svg>
);
export default XIcon;
