import React from "react";
import { Tag } from "primereact/tag";

const StatusTag = ({ status }: any) => {
  let statusText = "Unknown";
  let backgroundColor = "grey";

  switch (status) {
    case 1:
      statusText = "Open";
      backgroundColor = "green";
      break;
    case 2:
      statusText = "Closed";
      backgroundColor = "red";
      break;
    case 3:
      statusText = "In Progress";
      backgroundColor = "orange";
      break;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
        <span>{statusText}</span>
    </div>
  );
};

export default StatusTag;
