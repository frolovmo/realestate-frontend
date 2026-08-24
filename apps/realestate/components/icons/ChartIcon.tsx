import * as React from "react";
import { SVGProps } from "react";
const ChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={11}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.477 10.188a.352.352 0 0 1-.352.351H.875a.352.352 0 0 1-.352-.351V.812a.352.352 0 1 1 .704 0v6.652l3.15-3.15a.352.352 0 0 1 .496 0L6.5 5.94l3.37-3.37H8.375a.352.352 0 0 1 0-.703h2.344a.351.351 0 0 1 .351.352v2.344a.351.351 0 1 1-.703 0V3.067L6.748 6.686a.352.352 0 0 1-.496 0L4.625 5.06 1.227 8.458v1.378h10.898a.352.352 0 0 1 .352.351Z"
    />
  </svg>
);
export default ChartIcon;
