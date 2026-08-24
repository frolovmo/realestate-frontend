import * as React from "react";
import { SVGProps } from "react";
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M9 0C4.038 0 0 4.038 0 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9Zm0 1.5c4.151 0 7.5 3.349 7.5 7.5a7.485 7.485 0 0 1-6.384 7.41v-5.223h2.136l.335-2.17h-2.471V7.832c0-.9.296-1.7 1.139-1.7h1.353V4.239c-.238-.032-.74-.102-1.692-.102-1.986 0-3.15 1.049-3.15 3.438v1.442H5.725v2.17h2.041v5.204A7.482 7.482 0 0 1 1.5 9c0-4.151 3.349-7.5 7.5-7.5Z"
    />
  </svg>
);
export default FacebookIcon;
