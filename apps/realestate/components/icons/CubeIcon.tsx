import * as React from "react";
import { SVGProps } from "react";
const CubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M20.523 5.075 11.585.182a1.219 1.219 0 0 0-1.17 0L1.477 5.075a1.219 1.219 0 0 0-.633 1.068v9.714a1.218 1.218 0 0 0 .634 1.068l8.937 4.893a1.214 1.214 0 0 0 1.17 0l8.938-4.893a1.22 1.22 0 0 0 .633-1.068V6.143a1.218 1.218 0 0 0-.633-1.068ZM10.805.895a.4.4 0 0 1 .39 0l8.81 4.824L11 10.647 1.994 5.719 10.805.895ZM1.867 16.213a.406.406 0 0 1-.21-.356V6.459l8.937 4.891v9.64l-8.726-4.777Zm18.265 0-8.726 4.774V11.35l8.938-4.89v9.397a.406.406 0 0 1-.212.355v.001Z"
    />
  </svg>
);
export default CubeIcon;
