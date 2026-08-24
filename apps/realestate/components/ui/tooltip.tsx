import React from "react";
import { BaseComponentProps } from "@/lib/types";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface ITooltipProps extends BaseComponentProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip = ({
  children,
  content,
  className = "",
  ...props
}: ITooltipProps) => {
  const id = `${Date.now()}-${Math.random()}`;

  return (
    <>
      <div data-tooltip-id={id}>{children}</div>

      <ReactTooltip id={id} place="top" content={content} {...props} />
    </>
  );
};

export default Tooltip;
