import * as React from "react";
import { SVGProps } from "react";
const CheckMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M5.55 11.308.58 6.338l.714-.713L5.55 9.881 14.706.725l.713.714-9.869 9.87Z"
    />
  </svg>
);
export default CheckMarkIcon;
