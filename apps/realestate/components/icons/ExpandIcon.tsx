import * as React from "react";
import { SVGProps } from "react";
const ExpandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.095}
      d="M18.262 6.214V.762m0 0-6.024.016m6.024-.016-6.571 6.47m.547 11.053 6.024.002-.014-6.023m.014 5.92-6.571-6.47M.738 6.215V.738h6.024m.548 6.494L.738.762M6.762 18.28l-6.024.007v-5.501M7.31 11.69.738 18.262"
    />
  </svg>
);
export default ExpandIcon;
