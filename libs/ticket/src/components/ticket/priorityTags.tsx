import React from "react";
import { Tag } from "primereact/tag";

const PriorityTag = ({ priority }: any) => {
  let priorityText = "Not Set";
  let backgroundColor = "grey";

  switch (priority) {
    case 1:
      priorityText = "Low";
      backgroundColor = "grey";
      break;
    case 2:
      priorityText = "Medium";
      backgroundColor = "yellow";
      break;
    case 3:
      priorityText = "High";
      backgroundColor = "orange";
      break;
    case 4:
      priorityText = "Critical";
      backgroundColor = "red";
      break;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
      <Tag
        style={{
          backgroundColor,
          color: "white",
          display: "inline-block",
          marginRight: "10px",
        }}
      />
      <span>{priorityText}</span>
    </div>

  );
};

export default PriorityTag;
