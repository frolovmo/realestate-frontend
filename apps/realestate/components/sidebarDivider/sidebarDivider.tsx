import React from "react";
import { ISidebarDividerProps } from "./sidebarDivider.types";

const SidebarDivider = ({ className, ...props }: ISidebarDividerProps) => {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent ${className}`}
      {...props}
    />
  );
};

export default SidebarDivider;
