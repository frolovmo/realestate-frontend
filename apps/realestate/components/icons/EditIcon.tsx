import * as React from "react";
import { SVGProps } from "react";
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 0a1 1 0 0 1 .117 1.993L10 2H2v14h14V8a1 1 0 0 1 1.993-.117L18 8v8a2 2 0 0 1-1.85 1.995L16 18H2a2 2 0 0 1-1.995-1.85L0 16V2A2 2 0 0 1 1.85.005L2 0h8Zm6.243.343a1 1 0 0 1 1.497 1.32l-.083.095-9.9 9.899a1 1 0 0 1-1.497-1.32l.083-.094 9.9-9.9Z"
    />
  </svg>
);
export default EditIcon;
