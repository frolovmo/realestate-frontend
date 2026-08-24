import * as React from "react";
import { SVGProps } from "react";
const VacantIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M19.313.094H2.25A2.031 2.031 0 0 0 .219 2.125v9.75a2.031 2.031 0 0 0 2.031 2.031h17.063a2.031 2.031 0 0 0 2.03-2.031v-9.75a2.031 2.031 0 0 0-2.03-2.031Zm1.218 11.781a1.22 1.22 0 0 1-1.218 1.219H2.25a1.22 1.22 0 0 1-1.219-1.219v-9.75A1.219 1.219 0 0 1 2.25.906h17.063a1.219 1.219 0 0 1 1.218 1.219v9.75Zm4.063-8.125v6.5a.407.407 0 0 1-.813 0v-6.5a.407.407 0 0 1 .813 0Z"
    />
  </svg>
);
export default VacantIcon;
