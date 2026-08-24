import * as React from "react";
import { SVGProps } from "react";
const DetachedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 1 1 6m10-4v19H6c-1.886 0-2.828 0-3.414-.586C2 19.828 2 18.886 2 17V6m9 0 10 5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 21h7c1.886 0 2.828 0 3.414-.586C20 19.828 20 18.885 20 17v-6.5M17 9V6M6 10h1m-1 4h1m8-1h1m-.5 8v-4"
    />
  </svg>
);
export default DetachedIcon;
