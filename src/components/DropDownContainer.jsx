import { Dropdown } from "antd";
import React from "react";

const DropDownContainer = ({ menu, showArrow, children }) => {
  return (
    <Dropdown menu={{ menu }} arrow={showArrow}>
      {children}
    </Dropdown>
  );
};

export default DropDownContainer;
