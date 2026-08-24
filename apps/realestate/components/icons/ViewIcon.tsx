import * as React from "react";
import { SVGProps } from "react";
const ViewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#707070"
      d="M19.337 9.787A10.431 10.431 0 0 0 10 3.125 10.431 10.431 0 0 0 .662 9.787a.625.625 0 0 0 0 .425A10.43 10.43 0 0 0 10 16.876a10.431 10.431 0 0 0 9.337-6.662.624.624 0 0 0 0-.425ZM10 15.625c-3.313 0-6.813-2.456-8.082-5.625C3.188 6.831 6.688 4.375 10 4.375c3.312 0 6.812 2.456 8.081 5.625-1.269 3.169-4.769 5.625-8.081 5.625Z"
    />
    <path
      fill="#707070"
      d="M10 6.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm0 6.25a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
    />
  </svg>
);
export default ViewIcon;
