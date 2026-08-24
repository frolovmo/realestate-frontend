import * as React from "react";
import { SVGProps } from "react";
const CameraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.75 1.75H5.25a3.5 3.5 0 0 0-3.5 3.5v17.5a3.5 3.5 0 0 0 3.5 3.5h17.5a3.5 3.5 0 0 0 3.5-3.5V10.5H24.5v12.25a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75V5.25A1.75 1.75 0 0 1 5.25 3.5h10.5V1.75Z"
    />
    <path
      fill="currentColor"
      d="M27.125 0h-8.75a.875.875 0 0 0-.875.875v7c0 .483.392.875.875.875h8.75A.875.875 0 0 0 28 7.875v-7A.875.875 0 0 0 27.125 0Z"
    />
  </svg>
);
export default CameraIcon;
