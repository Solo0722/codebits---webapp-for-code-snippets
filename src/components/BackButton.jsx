"use client";
import { Button } from "antd";
import React from "react";
import IconifyIcon from "./IconifyIcon";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const BackButton = ({ buttonStyle }) => {
  const router = useRouter();

  return (
    <BackButtonView
      icon={<IconifyIcon name={"solar:arrow-left-outline"} />}
      shape="circle"
      type="text"
      onClick={() => router.back()}
      style={buttonStyle}
    />
  );
};

const BackButtonView = styled(Button)`
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;

  /* &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  } */
`;

export default BackButton;
