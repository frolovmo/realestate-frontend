import * as React from "react";
import { SVGProps } from "react";
const RatingStarIcon = ({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    className={className}
    {...props}
  >
    <path
      fill="#FFCB45"
      d="m5.882 0 1.89 3.222 3.669.789-2.502 2.78.379 3.709-3.436-1.503L2.447 10.5l.378-3.71L.323 4.01l3.67-.788L5.883 0Z"
      className={className}
    />
  </svg>
);
export default RatingStarIcon;
