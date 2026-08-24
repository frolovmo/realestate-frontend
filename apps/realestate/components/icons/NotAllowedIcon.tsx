import * as React from "react";
import { SVGProps } from "react";
const NotAllowedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 .25A9.75 9.75 0 1 0 19.75 10 9.76 9.76 0 0 0 10 .25ZM18.25 10a8.209 8.209 0 0 1-1.913 5.276L4.724 3.662A8.25 8.25 0 0 1 18.25 10Zm-16.5 0a8.209 8.209 0 0 1 1.913-5.276l11.613 11.613A8.25 8.25 0 0 1 1.75 10Z"
    />
  </svg>
);
export default NotAllowedIcon;
