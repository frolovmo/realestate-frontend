import * as React from "react";
import { SVGProps } from "react";
const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.078 7.5a.469.469 0 0 0-.469-.469H2.751l1.226-1.05a.47.47 0 0 0-.61-.712L1.179 7.144a.469.469 0 0 0 0 .712l2.188 1.875a.469.469 0 1 0 .61-.712l-1.225-1.05h6.857a.469.469 0 0 0 .469-.469Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M5.86 5c0 .439 0 .658.105.816a.625.625 0 0 0 .172.172c.158.106.377.106.816.106H9.61a1.406 1.406 0 1 1 0 2.812H6.953c-.439 0-.658 0-.816.105a.625.625 0 0 0-.172.173c-.106.158-.106.377-.106.816 0 1.768 0 2.652.55 3.2.548.55 1.432.55 3.2.55h.625c1.768 0 2.652 0 3.201-.55.55-.548.55-1.432.55-3.2V5c0-1.768 0-2.652-.55-3.2-.55-.55-1.433-.55-3.2-.55h-.626c-1.768 0-2.652 0-3.2.55-.55.548-.55 1.432-.55 3.2Z"
    />
  </svg>
);
export default LogoutIcon;
