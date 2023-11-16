import { CheckCircleOutlineOutlined, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import React from "react";

type AlertProps = {
  alert: { type: string; message: string };
};

export default function AlertCustom({ alert }: AlertProps) {
  function color(type: string): string {
    switch (type) {
      case "info":
        return "var(--info)";
      case "success":
        return "var(--success)";
      case "error":
        return "var(--error)";
      case "warning":
        return "var(--warning)";
      default:
        return "rgba(0,0,0,0.2)";
    }
  }
  return (
    <div id="alert" style={{ background: color(alert.type) }}>
      {alert.type === "info" && <InfoOutlined width={30} height={30} />}
      {alert.type === "success" && <CheckCircleOutlineOutlined width={30} height={30} />}
      {alert.type === "warning" && <WarningOutlined width={30} height={30} />}
      {alert.type === "error" && <WarningOutlined width={30} height={30} />}
      <p>{alert.message}</p>
    </div>
  );
}
