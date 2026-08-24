import * as React from "react";
import { SVGProps } from "react";
const PointerIcon = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={21}
    fill="none"
    className={className}
    {...props}
  >
    <path
      fill="#000"
      d="m24.45 11.04-9.16 9.159a.763.763 0 0 1-1.078-1.079l7.856-7.857H1.52a.764.764 0 0 1 0-1.526h20.547L14.212 1.88A.763.763 0 0 1 15.291.8l9.16 9.16a.763.763 0 0 1 0 1.078Z"
      className={className}
    />
  </svg>
);
export default PointerIcon;
