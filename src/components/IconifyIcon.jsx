import { Icon } from "@iconify/react";
import React from "react";
import { styled } from "styled-components";

const IconifyIcon = ({ name, size, color }) => {
  return (
    <IconifyIconWrapper color={color}>
      <Icon
        icon={name}
        fontSize={size || "16px"}
        strokeWidth={"12px"}
        className="iconify-icon"
      />
    </IconifyIconWrapper>
  );
};

const IconifyIconWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  iconify-icon {
    color: ${(props) => (props.color ? props.color : props.theme.textColor)};
  }
`;

export default IconifyIcon;
