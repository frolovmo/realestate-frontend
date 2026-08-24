import * as React from "react";
import { SVGProps } from "react";
const IdentifierIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      stroke="#707070"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.595 6.728 12.798 1.87c1.488-.709 3.04.845 2.332 2.333l-4.858 10.201c-.664 1.394-2.677 1.309-3.22-.138l-.897-2.396a1.75 1.75 0 0 0-1.024-1.024l-2.397-.899c-1.446-.542-1.532-2.555-.139-3.219Z"
    />
  </svg>
);
export default IdentifierIcon;
