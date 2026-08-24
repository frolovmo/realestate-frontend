import * as React from "react";
import { SVGProps } from "react";
const LaptopIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M29.167 21.25a2.925 2.925 0 0 0 2.916-2.917V3.75A2.925 2.925 0 0 0 29.167.833H5.833A2.925 2.925 0 0 0 2.917 3.75v14.583a2.925 2.925 0 0 0 2.916 2.917H0v2.917h35V21.25h-5.833ZM5.833 3.75h23.334v14.583H5.833V3.75Z"
    />
  </svg>
);
export default LaptopIcon;
