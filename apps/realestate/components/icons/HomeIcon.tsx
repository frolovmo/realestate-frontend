import * as React from "react";
import { SVGProps } from "react";
const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="currentColor"
    {...props}
  >
    <g clipPath="url(#a)">
      <path d="M8.163 3.467a.234.234 0 0 0-.324 0L2.445 8.62a.234.234 0 0 0-.072.17v4.835a.937.937 0 0 0 .937.938h2.815a.469.469 0 0 0 .469-.469V10.11a.234.234 0 0 1 .234-.235h2.344a.234.234 0 0 1 .234.235v3.984a.469.469 0 0 0 .469.469h2.814a.938.938 0 0 0 .938-.938V8.79a.236.236 0 0 0-.073-.17L8.163 3.467Z" />
      <path d="M14.883 7.654 12.69 5.557V2.376a.469.469 0 0 0-.469-.469h-1.406a.469.469 0 0 0-.469.469v.937L8.652 1.691A.912.912 0 0 0 8 1.438a.91.91 0 0 0-.65.253l-6.23 5.962a.478.478 0 0 0-.04.655.469.469 0 0 0 .68.032l6.078-5.81a.234.234 0 0 1 .324 0l6.08 5.81a.469.469 0 0 0 .662-.013.48.48 0 0 0-.022-.673Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M.5.5h15v15H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default HomeIcon;
