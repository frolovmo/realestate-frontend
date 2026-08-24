import * as React from "react";
import { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 9"
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M7.959 7.229a.516.516 0 1 1-.73.73L4.5 5.23 1.771 7.958a.517.517 0 0 1-.73-.73L3.77 4.5 1.042 1.77a.517.517 0 0 1 .73-.73L4.5 3.769 7.23 1.04a.517.517 0 0 1 .73.73L5.23 4.5 7.96 7.229Z"
    />
  </svg>
);
export default CloseIcon;
