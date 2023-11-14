"use client";
import { Button, Space } from "antd";
import React from "react";
import { styled } from "styled-components";

const Tools = () => {
  return (
    <ToolsWrapper>
      <TitleWrapper>
        <h3>Tools</h3>
        <Space size="small">
          <Button className="btn-save">Save snippet</Button>
        </Space>
      </TitleWrapper>
    </ToolsWrapper>
  );
};

const ToolsWrapper = styled.section`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  & .btn-save {
    background: ${({ theme }) => theme.gradientColor};
    border: none;
    color: #ffffff;
  }

  & .btn-save:hover {
    color: #ffffff;
  }
`;

export default Tools;
