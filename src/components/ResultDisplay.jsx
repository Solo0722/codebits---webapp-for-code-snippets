import { Result } from "antd";
import React from "react";

const ResultDisplay = ({ status, title, subTitle, extra, icon, styles }) => {
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      icon={icon}
      style={styles}
      extra={extra}
    />
  );
};

export default ResultDisplay;
