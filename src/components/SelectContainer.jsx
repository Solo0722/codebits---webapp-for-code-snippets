import { Select } from "antd";
import React from "react";

const SelectContainer = () => {
  return (
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "jack",
          label: "Jack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
        {
          value: "disabled",
          label: "Disabled",
          disabled: true,
        },
      ]}
    />
  );
};

export default SelectContainer;
