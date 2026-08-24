import * as React from "react";
import { SVGProps } from "react";
const UnionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={8}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillOpacity={0.25}
      d="M12.48.003H11.31c-.08 0-.155.04-.202.103l-4.439 6.12L2.23.105a.25.25 0 0 0-.201-.103H.856a.125.125 0 0 0-.102.199l5.51 7.595c.2.275.609.275.807 0l5.51-7.595a.124.124 0 0 0-.1-.199Z"
    />
  </svg>
);
export default UnionIcon;
