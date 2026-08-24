import * as React from "react";
import { SVGProps } from "react";

const BathIconColored = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 12 13"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.75}
      d="M11.232 6.444v1.75a2.333 2.333 0 0 1-2.333 2.333H3.065A2.333 2.333 0 0 1 .732 8.194v-1.4a.35.35 0 0 1 .35-.35h10.15Zm0 0v-3.5A2.333 2.333 0 0 0 8.899.61H5.982m2.333 9.916.584 1.167m-5.25-1.167-.584 1.167"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.75}
      d="M7.965 3.527H4a.318.318 0 0 1-.327-.349c.085-.774.48-2.567 2.31-2.567s2.225 1.793 2.31 2.567a.318.318 0 0 1-.327.35Z"
    />
  </svg>
);
export default BathIconColored;
