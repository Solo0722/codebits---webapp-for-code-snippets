import IconifyIcon from "@/src/components/IconifyIcon";
import { defaultTheme } from "@/src/theme/colors";
import { Avatar, Button, Col, Space } from "antd";
import React from "react";
import styled from "styled-components";

const PromptCard = () => {
  return (
    <PromptCardWrapper>
      <Space size={5} direction="vertical" style={{ width: "100%" }}>
        <div className="titlebar">
          <h4>Dark mode toggle</h4>
          <Space size={5} direction="horizontal">
            <Button
              icon={<IconifyIcon name={"solar:heart-outline"} />}
              shape="circle"
              type="text"
              // onClick={() => router.back()}
            />
            <Button
              icon={<IconifyIcon name={"solar:trash-bin-trash-bold"} />}
              shape="circle"
              type="text"
              styles={{
                icon: {
                  color: defaultTheme.danger,
                },
              }}
              // onClick={() => router.back()}
            />
          </Space>
        </div>
        <small>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae porro
          animi ipsum quidem nostrum ullam qui. Reiciendis at fugiat officiis.
        </small>
        <small>#javascript</small>
        <div className="footerbar">
          <Space
            size={2}
            direction="horizontal"
            style={{ alignItems: "center" }}
          >
            <Avatar size={"small"} />
            <small>Solomon</small>
          </Space>
          <small>24th November 2023</small>
        </div>
      </Space>
    </PromptCardWrapper>
  );
};

const PromptCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  min-height: 200px;
  background-color: ${({ theme }) => theme.accentColor1};
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  /* margin: 10px 0; */
  padding: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.001);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  & .titlebar,
  & .footerbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  & small {
    color: ${({ theme }) => theme.textColor2};
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default PromptCard;
