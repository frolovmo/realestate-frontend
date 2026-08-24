import * as React from "react";
import { SVGProps } from "react";
const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#707070"
      d="m4.93 13.288 3.412-2.058 3.412 2.085-.893-3.9 3.005-2.599-3.953-.352-1.57-3.683-1.571 3.656-3.953.352 3.005 2.627-.893 3.872ZM3.28 15.56l1.343-5.755L.156 5.937l5.883-.51L8.342 0l2.304 5.426 5.881.51-4.465 3.868 1.344 5.755-5.064-3.054L3.28 15.56Z"
    />
  </svg>
);
export default StarIcon;
