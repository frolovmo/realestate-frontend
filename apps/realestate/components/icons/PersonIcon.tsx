import * as React from "react";
import { SVGProps } from "react";
const PersonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.245 2.392C9.675 1.776 8.88 1.437 8 1.437c-.884 0-1.682.337-2.25.949-.574.618-.853 1.459-.787 2.366C5.093 6.543 6.455 8 8 8s2.905-1.457 3.037-3.247c.067-.9-.215-1.738-.792-2.361ZM13.156 14.562H2.844a.91.91 0 0 1-.71-.326 1.034 1.034 0 0 1-.21-.853c.248-1.372 1.02-2.524 2.232-3.333C5.234 9.332 6.6 8.937 8 8.937c1.401 0 2.766.395 3.844 1.113 1.213.808 1.985 1.96 2.232 3.332.057.315-.02.626-.21.853a.908.908 0 0 1-.71.327Z"
    />
  </svg>
);
export default PersonIcon;
