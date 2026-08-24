import * as React from "react";
import { SVGProps } from "react";
const ResidentialIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#707070"
      d="M15.52 16.5V13c.98-.14 1.68-.98 1.68-2.1s-.98-2.1-2.1-2.1-2.1.98-2.1 2.1c0 .98.7 1.96 1.68 2.1v3.5H8.8V.4h-7v16.1H.4v.7h18.2v-.7h-3.08ZM7.4 13H3.2v-1.4h4.2V13Zm0-2.8H3.2V8.8h4.2v1.4Zm0-2.8H3.2V6h4.2v1.4Zm0-2.8H3.2V3.2h4.2v1.4Z"
    />
  </svg>
);
export default ResidentialIcon;
