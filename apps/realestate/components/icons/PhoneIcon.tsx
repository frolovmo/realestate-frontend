import * as React from "react";
import { SVGProps } from "react";
const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={31}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M3.209 3.833v23.334h14.583V3.833H3.209ZM1.75.917h17.5a1.458 1.458 0 0 1 1.459 1.458v26.25a1.458 1.458 0 0 1-1.459 1.458H1.75a1.458 1.458 0 0 1-1.458-1.458V2.375A1.458 1.458 0 0 1 1.75.917Zm8.75 21.875a1.458 1.458 0 1 1 0 2.916 1.458 1.458 0 0 1 0-2.916Z"
    />
  </svg>
);
export default PhoneIcon;
