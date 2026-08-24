import * as React from "react";
import { SVGProps } from "react";
const QuotesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={53}
    height={46}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6.094}
      d="M21.39 3.234H3.11v22.344c0 14.219 10.156 18.281 18.28 16.25-6.093-6.094-6.093-10.156-6.093-16.25h6.094V3.234Zm28.438 0H31.547v22.344c0 14.219 10.156 18.281 18.281 16.25-6.094-6.094-6.094-10.156-6.094-16.25h6.094V3.234Z"
    />
  </svg>
);
export default QuotesIcon;
