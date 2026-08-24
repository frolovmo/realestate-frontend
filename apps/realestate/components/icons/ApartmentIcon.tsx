import * as React from "react";
import { SVGProps } from "react";
const ApartmentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1.539 17.154c-.294 0-.54-.1-.74-.3-.2-.2-.299-.446-.299-.738V5.192c0-.293.1-.54.299-.739.2-.2.446-.3.74-.3H4.5v-2.96c0-.294.1-.54.299-.74.2-.2.446-.3.74-.3h6.923c.293 0 .54.1.739.3.2.2.299.446.299.74v6.96h2.962c.293 0 .54.1.739.3.2.2.299.446.299.74v6.923c0 .293-.1.54-.299.739-.2.2-.446.299-.74.299H10.5v-4h-3v4H1.539Zm-.039-1h3v-3h-3v3Zm0-4h3v-3h-3v3Zm0-4h3v-3h-3v3Zm4 4h3v-3h-3v3Zm0-4h3v-3h-3v3Zm0-4h3v-3h-3v3Zm4 8h3v-3h-3v3Zm0-4h3v-3h-3v3Zm0-4h3v-3h-3v3Zm4 12h3v-3h-3v3Zm0-4h3v-3h-3v3Z"
    />
  </svg>
);
export default ApartmentIcon;
